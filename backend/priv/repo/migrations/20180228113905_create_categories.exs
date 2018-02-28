defmodule Salvadanaio.Repo.Migrations.CreateCategories do
  use Ecto.Migration

  def change do
    create table(:categories) do
      add :title, :string
      add :identifier, :string

      timestamps()
    end
    create index(:categories, [:title], unique: true)
    create index(:categories, [:identifier], unique: true)
  end
end
