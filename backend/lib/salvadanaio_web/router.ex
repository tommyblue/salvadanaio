defmodule SalvadanaioWeb.Router do
  use SalvadanaioWeb, :router
  alias SalvadanaioWeb.Api

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Api do
    pipe_through :api
    scope "/v1", V1 do
      resources "/accounts", AccountsController, except: [:new, :edit] do
        resources "/movements", AccountsMovementsController, only: [:index, :show]
      end
      resources "/movements", MovementsController, except: [:new, :edit]
      scope "/analytics", Analytics do
        get "/balance", BalanceController, :index
        get "/movements", MovementsController, :index
      end
    end
  end
end
