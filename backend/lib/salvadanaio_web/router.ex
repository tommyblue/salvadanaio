defmodule SalvadanaioWeb.Router do
  use SalvadanaioWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SalvadanaioWeb.Api do
    pipe_through :api
    scope "/v1", V1 do
      resources "/accounts", AccountsController, except: [:new, :edit]
      resources "/movements", MovementsController, except: [:new, :edit]
    end
  end
end
