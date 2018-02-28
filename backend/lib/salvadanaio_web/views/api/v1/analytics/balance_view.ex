defmodule SalvadanaioWeb.Api.V1.Analytics.BalanceView do
  use SalvadanaioWeb, :view

  def render("index.json", %{balance: balance}) do
    %{data: render_many(balance, __MODULE__, "balance.json", as: :balance)}
  end

  def render("balance.json", %{balance: balance}) do
    balance
  end
end
