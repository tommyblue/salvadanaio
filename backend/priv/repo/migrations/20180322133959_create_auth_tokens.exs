defmodule Salvadanaio.Repo.Migrations.CreateAuthTokens do
  use Ecto.Migration

  def change do
    create table(:auth_tokens) do
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :token, :text, null: false
      add :revoked, :boolean, default: false, null: false
      add :revoked_at, :utc_datetime

      timestamps()
    end

    create unique_index(:auth_tokens, [:token])
    create index(:auth_tokens, [:user_id])
  end
end
