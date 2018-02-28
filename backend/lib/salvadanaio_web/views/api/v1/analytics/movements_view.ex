defmodule SalvadanaioWeb.Api.V1.Analytics.MovementsView do
  use SalvadanaioWeb, :view

  def render("index.json", %{movements: movements}) do
    %{data: render_many(movements, __MODULE__, "movements.json", as: :movements)}
  end

  def render("movements.json", %{movements: movements}) do
    movements
  end
end
