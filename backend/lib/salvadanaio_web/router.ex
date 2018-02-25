defmodule SalvadanaioWeb.Router do
  use SalvadanaioWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SalvadanaioWeb do
    pipe_through :api
  end
end
