defmodule SalvadanaioWeb.Plugs.Authenticate do
  import Plug.Conn
  alias Salvadanaio.Services.Authenticator
  alias Salvadanaio.Repo
  alias Salvadanaio.AuthToken

  def init(default), do: default

  def call(conn, _default) do
    case Authenticator.get_auth_token(conn) do
      {:ok, token} ->
        case AuthToken.get_valid_token(token) do
          nil -> unauthorized(conn)
          auth_token -> authorized(conn, auth_token.user)
        end
      _ -> unauthorized(conn)
    end
  end

  defp authorized(conn, user) do
    assign(conn, :signed_in, true)
    assign(conn, :signed_user, user)
    conn
  end

  defp unauthorized(conn) do
    conn |> send_resp(401, "") |> halt()
  end
end
