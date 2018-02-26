defmodule FinecoImport do
  @moduledoc """
  This module creates movements for a Fineco account, reading them from the XLSX file exported
  from the Fineco movements web page.
  The original exported file is a XLS file, which must be converted to XSLX before running this
  script.
  The module looks for the Account or creates it if not found.
  """

  alias Salvadanaio.Account
  alias Salvadanaio.Repo

  @id_line ["Data Operazione", "Data Valuta", "Entrate", "Uscite", "Descrizione", "Descrizione Completa"]
  @account_id 0

  def run(filepath) do
    IO.puts("Run #{filepath}")

    case Xlsxir.multi_extract(filepath, 0) do
      {:ok, xls} -> parse_rows(Xlsxir.get_list(xls), get_account_id())
      {:error, reason} ->
        IO.puts(reason)
        exit(1)
    end
  end

  def help() do
    IO.puts("Usage: mix run priv/import/fineco.exs <XLSX file>")
  end

  defp parse_rows([head | tail], account_id) do
    case head do
      @id_line -> print_values(tail, account_id)
      _ -> parse_rows(tail, account_id)
    end
  end

  defp parse_rows([], account_id) do
  end

  defp print_values([head | tail], account_id) do
    insert_movement(head, account_id)
    print_values(tail, account_id)
  end

  defp print_values([], account_id) do
  end

  defp insert_movement(row, account_id) do
    case row do
      [operation_date, value_date, income, "", short_description, description] ->
        movement_attrs = %Salvadanaio.Movement{
          account_id: account_id,
          operation_date: parse_date(operation_date),
          value_date: parse_date(value_date),
          amount: Money.new(Kernel.trunc(income*100), :EUR),
          short_description: short_description,
          description: description
        }
        add_movement(movement_attrs)

      [operation_date, value_date, "", outcome, short_description, description] ->
        movement_attrs = %Salvadanaio.Movement{
          account_id: account_id,
          operation_date: parse_date(operation_date),
          value_date: parse_date(value_date),
          amount: Money.new(Kernel.trunc(-outcome*100), :EUR),
          short_description: short_description,
          description: description
        }
        add_movement(movement_attrs)
    end
  end

  defp add_movement(movement_attrs) do
    Salvadanaio.Services.Movements.insert_movement(movement_attrs)
  end

  defp get_account_id() do
    # find account or create it
    case Repo.get_by(Account, name: "Fineco") do
      nil -> Salvadanaio.Repo.insert!(%Salvadanaio.Account{
        name: "Fineco",
        balance: Money.new(0, :EUR),
        balance_update_date: Date.utc_today()
      }).id
      account -> account.id
    end
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
	# {[verbose: true], [filepath], _} -> FinecoImport.run_verbose(filepath)
	{_, [filepath], _} -> FinecoImport.run(filepath)
	_ -> FinecoImport.help
end
