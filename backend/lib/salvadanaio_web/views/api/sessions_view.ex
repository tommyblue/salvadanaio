defmodule SalvadanaioWeb.Api.SessionsView do
  use SalvadanaioWeb, :view

  def render("show.json", %{token: token}) do
    %{data: %{token: token}}
  end
end
