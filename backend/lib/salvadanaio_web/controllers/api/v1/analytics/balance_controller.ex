defmodule SalvadanaioWeb.Api.V1.Analytics.BalanceController do
  use SalvadanaioWeb, :controller

  def index(conn, _) do
    query = "SELECT SUM(amount), d FROM (
      SELECT amount, to_char(value_date, 'YYYYMM') AS d FROM movements
       WHERE value_date > CURRENT_DATE - interval '12 months') m
    GROUP BY d
    ORDER BY d DESC;"
    result = Ecto.Adapters.SQL.query!(Salvadanaio.Repo, query)
    render conn, "index.json", balance: result.rows
  end
end
