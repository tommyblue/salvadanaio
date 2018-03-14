defmodule SalvadanaioWeb.Api.V1.AccountsController do
  use SalvadanaioWeb, :controller
  alias Salvadanaio.Repo
  alias Salvadanaio.Account
  alias SalvadanaioWeb.Api.V1.ChangesetView

  def index(conn, _params) do
    accounts = Repo.all(Account)
    render conn, "index.json", accounts: accounts
  end

  def show(conn, %{"id" => id}) do
    account = Repo.get!(Account, id)
    render conn, "show.json", account: account
  end

  def create(conn, account_params) do
    account_params = monetize_balance(account_params)
    changeset = Account.changeset(%Account{}, account_params)

    case Repo.insert(changeset) do
      {:ok, account} ->
        conn
        |> put_status(:created)
        |> render("show.json", account: account)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "account" => account_params}) do
    account = Repo.get!(Account, id)
    account_params = monetize_balance(account_params)
    changeset = Account.changeset(account, account_params)

    case Repo.update(changeset) do
      {:ok, account} ->
        conn
        |> put_status(:ok)
        |> render("show.json", account: account)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    account = Repo.get!(Account, id)
    Repo.delete!(account)
    conn
    |> send_resp(204, "")
  end

  defp monetize_balance(account_params) do
    case Map.fetch(account_params, "balance") do
      {:ok, balance} ->
        intvalue = Kernel.trunc(balance * 100)
        balance = Money.new(intvalue, :EUR)
        %{account_params | "balance" => balance}
      :error ->
        account_params
    end
  end
end
