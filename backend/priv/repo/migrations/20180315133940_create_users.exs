defmodule Salvadanaio.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string, null: false
      add :password_hash, :string, null: false
      add :token, :text

      timestamps()
    end

    create unique_index(:users, [:email])
    create unique_index(:users, [:token])
  end
end
