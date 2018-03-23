defmodule Salvadanaio.AuthToken do
  use Ecto.Schema
  import Ecto.Changeset
  alias Salvadanaio.AuthToken
  alias Salvadanaio.Repo
  alias Salvadanaio.User

  schema "auth_tokens" do
    belongs_to :user, User
    field :revoked, :boolean, default: false
    field :revoked_at, :utc_datetime
    field :token, :string
    timestamps()
  end

  def changeset(%AuthToken{} = auth_token, attrs) do
    auth_token
    |> cast(attrs, [:token])
    |> validate_required([:token])
    |> unique_constraint(:token)
  end

  def get_valid_token(token) do
    Repo.get_by(AuthToken, %{token: token, revoked: false})
    |> Repo.preload(:user)
  end
end
