defmodule SalvadanaioWeb.Api.SessionsController do
  use SalvadanaioWeb, :controller

  alias Salvadanaio.Repo
  alias Salvadanaio.User
  alias Salvadanaio.Guardian
  alias SalvadanaioWeb.Api.V1.ChangesetView

  def create(conn, %{"email" => email, "password" => password}) do
    case Comeonin.Bcrypt.check_pass(Repo.get_by!(User, email: email), password) do
      {:ok, user} ->
        {:ok, token, _} = Guardian.encode_and_sign(user, %{}, token_type: :access, ttl: {6, :hours})
        # Save the token, although it's not currently useful because using JWT tokens requires a
        # specific token storage and revoke system
        changeset = User.token_changeset(user, %{token: token})
        case Repo.update(changeset) do
          {:ok, user} ->
            conn
            |> put_status(:ok)
            |> render("show.json", %{token: user.token})
          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> render(ChangesetView, "error.json", changeset: changeset)
        end
      {:error, reason} ->
        conn
        |> send_resp(401, reason)
    end
  end
end
