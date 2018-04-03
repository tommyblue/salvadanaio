defmodule SalvadanaioWeb.Api.V1.Analytics.BalanceController do
  use SalvadanaioWeb, :controller

  def index(conn, _) do
    query = "SELECT d, account, SUM(amount) FROM (
      SELECT a.name AS account, m.amount, to_char(m.value_date, 'YYYYMM') AS d FROM movements m
       JOIN accounts a ON a.id=m.account_id
       WHERE value_date > CURRENT_DATE - interval '12 months') subq
    GROUP BY d, account
    ORDER BY account, d ASC;"
    result = Ecto.Adapters.SQL.query!(Salvadanaio.Repo, query)
    render conn, "index.json", balance: result.rows
  end
end
