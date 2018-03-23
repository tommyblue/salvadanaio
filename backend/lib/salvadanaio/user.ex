defmodule Salvadanaio.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Salvadanaio.Repo
  alias Salvadanaio.User
  alias Salvadanaio.AuthToken
  alias Salvadanaio.Services.Authenticator

  schema "users" do
    has_many :auth_tokens, AuthToken
    field :email, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    timestamps()
  end

  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
    |> validate_length(:email, min: 6)
    |> validate_length(:password, min: 5)
    |> unique_constraint(:email, downcase: true)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
      _ ->
        changeset
    end
  end

  def sign_in(email, password) do
    case Comeonin.Bcrypt.check_pass(Repo.get_by(User, email: email), password) do
      {:ok, user} ->
        token = Authenticator.generate_token(user)
        Repo.insert(Ecto.build_assoc(user, :auth_tokens, %{token: token}))
      err -> err
    end
  end

  def sign_out(conn) do
    case Authenticator.get_auth_token(conn) do
      {:ok, token} ->
        case Repo.get_by(AuthToken, %{token: token}) do
          nil -> {:error, :not_found}
          auth_token -> Repo.delete(auth_token)
        end
      error -> error
    end
  end
end
