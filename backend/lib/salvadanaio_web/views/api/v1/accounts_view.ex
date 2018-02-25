defmodule SalvadanaioWeb.Api.V1.AccountsView do
  use SalvadanaioWeb, :view

  def render("index.json", %{accounts: accounts}) do
    %{data: render_many(accounts, __MODULE__, "account.json", as: :account)}
  end

  def render("show.json", %{account: account}) do
    %{data: render_one(account, __MODULE__, "account.json")}
  end

  def render("account.json", %{account: account}) do
    %{id: account.id, name: account.name}
  end
end
