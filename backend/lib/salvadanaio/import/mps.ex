defmodule Salvadanaio.Import.Mps do
  @moduledoc """
  This module creates movements for a MPS account, reading them from the XLSX file exported
  from the MPS movements web page.
  The module looks for the Account or creates it if not found.
  """

  alias Salvadanaio.Account
  alias Salvadanaio.Category
  alias Salvadanaio.Repo

  # After this line in the XLSX file, the movements begin
  @id_line [nil, "DATA CONT.", "DATA VAL.", "CAUSALE", "DESCRIZIONE", "", "IMPORTO(€)"]

  def run(filepath, dry_run \\ false) do
    case Xlsxir.multi_extract(filepath, 0) do
      {:ok, xls} -> parse_rows(Xlsxir.get_list(xls), dry_run)
      {:error, reason} ->
        IO.puts(reason)
        exit(1)
    end
  end

  def help() do
    IO.puts("Usage: mix run priv/import/mps.exs <XLSX file>")
  end

  defp parse_rows([head | tail], dry_run) do
    case head do
      [nil, "Saldo Iniziale (€)", nil, balance, "", nil, nil] ->
        get_account_id(balance, dry_run)
        parse_rows(tail, dry_run)
      @id_line -> create_movements(tail, get_account_id(0, dry_run), dry_run)
      _ -> parse_rows(tail, dry_run)
    end
  end

  defp parse_rows([], _) do
  end

  defp create_movements([head | tail], account_id, dry_run) do
    acc = create_movements(tail, account_id, dry_run)
    movement = insert_movement(head, account_id, dry_run)
    if movement != nil do
      acc ++ [movement]
    else
      acc
    end
  end

  defp create_movements([], _, _) do
    []
  end

  defp insert_movement(row, account_id, dry_run) do
    case row do
      [nil, operation_date, value_date, short_description, description, "", amount] ->
        movement_attrs = %Salvadanaio.Movement{
          account_id: account_id,
          operation_date: NaiveDateTime.to_date(operation_date),
          value_date: NaiveDateTime.to_date(value_date),
          amount: Money.new(Kernel.trunc(Kernel.round(amount*100)), :EUR),
          short_description: short_description,
          description: description
        }

        add_movement(movement_attrs, dry_run)
      _ -> nil
    end
  end

  defp add_movement(movement_attrs, dry_run) do
    category_id = Category.get_category(movement_attrs.description, String.trim(movement_attrs.short_description))
    movement_attrs = Map.put(movement_attrs, :category_id, category_id)
    if not dry_run do
      Salvadanaio.Services.Movements.insert_movement(movement_attrs)
    end
    movement_attrs
  end

  defp get_account_id(initial_balance, dry_run) do
    # find account or create it
    case Repo.get_by(Account, name: "MPS") do
      nil ->
        if dry_run do
          IO.puts("Account doesn't exist")
          exit 1
        end
        Salvadanaio.Repo.insert!(%Salvadanaio.Account{
          name: "MPS",
          balance: Money.new(Kernel.trunc(initial_balance*100), :EUR),
          balance_update_date: Date.utc_today()
        }).id
      account -> account.id
    end
  end
end
