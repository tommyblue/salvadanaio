defmodule SalvadanaioWeb.Api.V1.Analytics.BalanceView do
  use SalvadanaioWeb, :view

  def render("index.json", %{balance: balance}) do
    %{data: Enum.group_by(balance, fn([h|t]) -> h end, fn([h|t]) -> t end)}
  end
end
