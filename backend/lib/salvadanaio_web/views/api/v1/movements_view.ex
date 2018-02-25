defmodule SalvadanaioWeb.Api.V1.MovementsView do
  use SalvadanaioWeb, :view

  def render("index.json", %{movements: movements}) do
    %{data: render_many(movements, __MODULE__, "movement.json", as: :movement)}
  end

  def render("show.json", %{movement: movement}) do
    %{data: render_one(movement, __MODULE__, "movement.json", as: :movement)}
  end

  def render("movement.json", %{movement: movement}) do
    %{
      id: movement.id,
      operation_date: movement.operation_date,
      value_date: movement.value_date,
      amount: movement.amount,
      short_description: movement.short_description,
      description: movement.description,
      account_id: movement.account_id,
      account: render_one(movement.account, SalvadanaioWeb.Api.V1.AccountsView, "account.json", as: :account),
    }
  end
end
