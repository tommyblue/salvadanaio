defmodule Salvadanaio.Import.Filter do

  alias Salvadanaio.Account
  alias Salvadanaio.Repo

  def get_importer(account_id) do
    case Repo.get(Account, account_id) do
      nil -> nil
      account ->
        case account.name do
          "MPS" -> Salvadanaio.Import.Mps
          "Fineco" -> Salvadanaio.Import.Fineco
          _ -> nil
        end
    end
  end
end
