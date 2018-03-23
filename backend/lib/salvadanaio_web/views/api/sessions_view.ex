defmodule SalvadanaioWeb.Api.SessionsView do
  use SalvadanaioWeb, :view

  def render("show.json", auth_token) do
    %{data: %{token: auth_token.token}}
  end
end
