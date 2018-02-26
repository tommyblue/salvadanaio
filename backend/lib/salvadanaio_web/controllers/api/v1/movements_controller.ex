defmodule SalvadanaioWeb.Api.V1.MovementsController do
  use SalvadanaioWeb, :controller
  alias Salvadanaio.Repo
  alias Salvadanaio.Movement
  alias SalvadanaioWeb.Api.V1.ChangesetView
  alias Ecto.Multi

  def index(conn, _params) do
    movements = Repo.all(Movement) |> Repo.preload(:account)
    render conn, "index.json", movements: movements
  end

  def show(conn, %{"id" => id}) do
    movement = Repo.get!(Movement, id) |> Repo.preload(:account)
    render conn, "show.json", movement: movement
  end

  def create(conn, movement_params = %{"account_id" => account_id}) do
    movement_params = monetize_amount(movement_params)
    changeset = Movement.changeset(%Movement{}, movement_params)

    case Repo.transaction(
      Multi.new
      |> Multi.insert(:movement, changeset)
      |> Multi.run(:update_balance, &Salvadanaio.Services.Movements.update_balance/1)
    ) do
      {:ok, changes} ->
        movement = Repo.preload(changes.movement, :account)
        conn
        |> put_status(:created)
        |> render "show.json", movement: movement
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "movement" => movement_params}) do
    movement = Repo.get!(Movement, id) |> Repo.preload(:account)
    movement_params = monetize_amount(movement_params)
    changeset = Movement.changeset(movement, movement_params)

    case Repo.transaction(
      Multi.new
      |> Multi.update(:movement, changeset)
      |> Multi.run(:update_balance, &Salvadanaio.Services.Movements.update_balance/1)
    ) do
      {:ok, changes} ->
        conn
        |> put_status(:ok)
        |> render "show.json", movement: changes.movement
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    movement = Repo.get!(Movement, id)
    Repo.delete!(movement)
    conn
    |> send_resp(204, "")
  end

  defp monetize_amount(movement_params) do
    case Map.fetch(movement_params, "amount") do
      {:ok, amount} ->
        intvalue = Kernel.trunc(amount * 100)
        amount = Money.new(intvalue, :EUR)
        %{movement_params | "amount" => amount}
      :error ->
        movement_params
    end
  end
end