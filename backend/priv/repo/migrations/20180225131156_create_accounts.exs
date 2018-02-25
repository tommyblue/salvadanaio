defmodule Salvadanaio.Repo.Migrations.CreateAccounts do
  use Ecto.Migration

  def change do
    create table(:accounts) do
      add :name, :string, null: false
      add :balance, :integer
      add :balance_update_date, :date
      timestamps()
    end

  end
end
