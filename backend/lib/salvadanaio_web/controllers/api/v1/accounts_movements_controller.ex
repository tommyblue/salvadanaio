defmodule SalvadanaioWeb.Api.V1.AccountsMovementsController do
  use SalvadanaioWeb, :controller
  alias Salvadanaio.Repo
  alias Salvadanaio.Movement
  import Ecto.Query, only: [from: 2]

  def index(conn, %{"accounts_id" => account_id} = params) do
    query = from(m in Movement, where: m.account_id == ^account_id)
    query = case Map.get(params, "from_date") do
      nil -> query
      from_date -> from(m in query, where: m.operation_date >= ^Date.from_iso8601!(from_date))
    end
    query = case Map.get(params, "to_date") do
      nil -> query
      to_date -> from(m in query, where: m.operation_date <= ^Date.from_iso8601!(to_date))
    end
    movements = Repo.all(query)
    render conn, "index.json", movements: movements
  end

  def show(conn, %{"accounts_id" => account_id, "id" => id}) do
    movement = Repo.get_by!(Movement, id: id, account_id: account_id)
    render conn, "show.json", movement: movement
  end

  def upload(conn, %{"accounts_id" => account_id, "file" => file}) do
    case Salvadanaio.Import.Filter.get_importer(account_id) do
      nil -> conn |> put_status(400) |> json(%{error: "what an error!"})
      import_module -> import_module.run(file.path)
    end
    conn |> send_resp(201, "")
  end
end
