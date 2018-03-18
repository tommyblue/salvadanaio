defmodule SalvadanaioWeb.Router do
  use SalvadanaioWeb, :router
  alias SalvadanaioWeb.Api

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Api do
    pipe_through :api

    scope "/sessions" do
      post "/sign_in", SessionsController, :create
    end

    scope "/v1", V1 do
      pipe_through Salvadanaio.AuthAccessPipeline

      resources "/accounts", AccountsController, except: [:new, :edit] do
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
