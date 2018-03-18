defmodule Salvadanaio.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Salvadanaio.User


  schema "users" do
    field :email, :string
    field :password_hash, :string
    field(:password, :string, virtual: true)
    field(:token, :string)
    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
    |> validate_length(:email, min: 6)
    |> validate_length(:password, min: 5)
    |> unique_constraint(:email, downcase: true)
    |> put_password_hash()
  end

  def token_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:token])
    |> validate_required([:token])
    |> unique_constraint(:token)
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
      _ ->
        changeset
    end
  end
end
