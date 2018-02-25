defmodule Salvadanaio.Services.Movements do
  alias Ecto.Multi
  alias Salvadanaio.Repo

  def insert_movement(movement_changeset) do
    Repo.transaction(
      Multi.new
      |> Multi.insert(:movement, movement_changeset)
      |> Multi.run(:update_balance, &update_balance/1)
    )
  end

  def update_balance(%{movement: movement}) do
    Salvadanaio.Account.update_balance(movement.account_id, movement.amount)
  end
end
