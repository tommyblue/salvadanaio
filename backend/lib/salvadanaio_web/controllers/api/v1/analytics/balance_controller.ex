defmodule SalvadanaioWeb.Api.V1.Analytics.BalanceController do
  use SalvadanaioWeb, :controller
  alias Salvadanaio.Repo
  alias Salvadanaio.Account
  import Ecto.Query, only: [from: 2]

  def index(conn, _) do
    # query = "SELECT d, account, SUM(amount) FROM (
    #   SELECT a.name AS account, m.amount, to_char(m.value_date, 'YYYY-MM') AS d FROM movements m
    #    JOIN accounts a ON a.id=m.account_id
    #    WHERE value_date > CURRENT_DATE - interval '12 months') subq
    # GROUP BY d, account
    # ORDER BY account, d ASC;"
    query = "SELECT SUM(amount), d, a.name, a.balance FROM (
      SELECT amount, account_id, to_char(value_date, 'YYYY-MM') AS d
      FROM movements
       WHERE value_date > CURRENT_DATE - interval '12 months') m
       join accounts a on a.id = account_id
    GROUP BY d, a.name, a.balance
    ORDER BY d ASC;"
    q = Ecto.Adapters.SQL.query!(Repo, query)

    result = Enum.reduce(q.rows, %{}, fn([_, _, account_id, _] = v, acc) ->
      Map.update(acc, account_id, [v], fn(list) -> list ++ [v] end)
    end)
    new_result = Enum.flat_map(Map.values(result), fn(el) ->
      [[sum, date, account_id, balance] | t] = el
      init = [date, account_id, sum + balance]
      then = Enum.scan(t, init, fn([sum, date, account_id, _], [_, _, old_sum] = acc) ->
        [date, account_id, sum + old_sum]
      end)
      [init | then]
    end)

    render conn, "index.json", balance: new_result
  end
end
