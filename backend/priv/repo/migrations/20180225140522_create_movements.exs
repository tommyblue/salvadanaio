defmodule Salvadanaio.Repo.Migrations.CreateMovements do
  use Ecto.Migration

  def change do
    create table(:movements) do
      add :account_id, references(:accounts, on_update: :update_all, on_delete: :delete_all)
      add :operation_date, :date
      add :value_date, :date
      add :amount, :integer
      add :short_description, :string
      add :description, :text
      timestamps()
    end
  end
end
