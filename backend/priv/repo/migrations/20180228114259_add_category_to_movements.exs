defmodule Salvadanaio.Repo.Migrations.AddCategoryToMovements do
  use Ecto.Migration

  def change do
    alter table(:movements) do
      add :category_id, references(:categories, on_update: :nilify_all, on_delete: :nilify_all)
    end
    create index(:movements, [:category_id])
  end
end
