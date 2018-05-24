defmodule SalvadanaioWeb.Router do
  use SalvadanaioWeb, :router
  alias SalvadanaioWeb.Api

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :authenticate do
    plug SalvadanaioWeb.Plugs.Authenticate
  end

  scope "/api", Api do
    pipe_through :api

    scope "/sessions" do
      post "/sign_in", SessionsController, :create
      delete "/sign_out", SessionsController, :delete
    end

    scope "/v1", V1 do
      pipe_through :authenticate
      resources "/accounts", AccountsController, except: [:new, :edit] do
        post "/movements/upload", AccountsMovementsController, :upload
        resources "/movements", AccountsMovementsController, only: [:index, :show]
      end
      resources "/movements", MovementsController, except: [:new, :edit]
      resources "/categories", CategoriesController, only: [:index]
      scope "/analytics", Analytics do
        get "/balance", BalanceController, :index
        get "/movements", MovementsController, :index
      end
    end
  end
end
