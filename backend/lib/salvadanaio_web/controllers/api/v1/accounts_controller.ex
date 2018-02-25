defmodule SalvadanaioWeb.Api.V1.AccountsController do
  use SalvadanaioWeb, :controller
  alias Salvadanaio.Repo
  alias Salvadanaio.Account

  def index(conn, _params) do
    accounts = Repo.all(Account)
    render conn, "index.json", accounts: accounts
  end
end
