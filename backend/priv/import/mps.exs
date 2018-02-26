defmodule MpsImport do
  @moduledoc """
  This module creates movements for a MPS account, reading them from the XLSX file exported
  from the MPS movements web page.
  The module looks for the Account or creates it if not found.
  """

  alias Salvadanaio.Account
  alias Salvadanaio.Repo

  # After this line in the XLSX file, the movements begin
  @id_line [nil, "DATA CONT.", "DATA VAL.", "CAUSALE", "DESCRIZIONE", "", "IMPORTO(€)"]

  def run(filepath) do
    case Xlsxir.multi_extract(filepath, 0) do
      {:ok, xls} -> parse_rows(Xlsxir.get_list(xls))
      {:error, reason} ->
        IO.puts(reason)
        exit(1)
    end
  end

  def help() do
    IO.puts("Usage: mix run priv/import/mps.exs <XLSX file>")
  end

  defp parse_rows([head | tail]) do
    case head do
      [nil, "Saldo Iniziale (€)", nil, balance, "", nil, nil] ->
        get_account_id(balance)
        parse_rows(tail)
      @id_line -> print_values(tail, get_account_id())
      _ -> parse_rows(tail)
    end
  end

  defp parse_rows([]) do
  end

  defp print_values([head | tail], account_id) do
    insert_movement(head, account_id)
    print_values(tail, account_id)
  end

  defp print_values([], _) do
  end

  defp insert_movement(row, account_id) do
    case row do
      [nil, operation_date, value_date, short_description, description, "", amount] ->
        movement_attrs = %Salvadanaio.Movement{
          account_id: account_id,
          operation_date: Date.from_erl!(operation_date),
          value_date: Date.from_erl!(value_date),
          amount: Money.new(Kernel.trunc(Kernel.round(amount*100)), :EUR),
          short_description: short_description,
          description: description
        }
        add_movement(movement_attrs)
      _ -> nil
    end
  end

  defp add_movement(movement_attrs) do
    Salvadanaio.Services.Movements.insert_movement(movement_attrs)
  end

  defp get_account_id(initial_balance \\ 0, balance_date \\ Date.utc_today()) do
    # find account or create it
    case Repo.get_by(Account, name: "MPS") do
      nil -> create_account(initial_balance, balance_date)
      account -> account.id
    end
  end

  defp create_account(initial_balance, balance_date) do
    Salvadanaio.Repo.insert!(%Salvadanaio.Account{
      name: "MPS",
      balance: Money.new(Kernel.trunc(initial_balance*100), :EUR),
      balance_update_date: balance_date
    }).id
  end

  # Accepts a date as string in the format DD/MM/YYYY and returns a Date.
  defp parse_date(datestr) do
    String.split(datestr, "/")
      |> Enum.map(&Integer.parse/1)
      |> Enum.map(fn {int, ""} -> int end)
      |> Enum.reverse
      |> List.to_tuple
      |> Date.from_erl!
  end
end

parsed = OptionParser.parse(System.argv)

case parsed do
	# {[verbose: true], [filepath], _} -> MpsImport.run_verbose(filepath)
	{_, [filepath], _} -> MpsImport.run(filepath)
	_ -> MpsImport.help
end
