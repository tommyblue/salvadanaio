defmodule Salvadanaio.Repo do
  use Ecto.Repo, otp_app: :salvadanaio

  @doc """
  Dynamically loads the repository url from the
  DATABASE_URL environment variable or from specific
  db env confs.
  """
  def init(_, config) do
    case {System.get_env("PGDATABASE"), System.get_env("PGHOST")} do
      {nil, nil} ->
        {:ok, Keyword.put(config, :url, System.get_env("DATABASE_URL"))}
      _ ->
        config = config
          |> Keyword.put(:username, System.get_env("PGUSER"))
          |> Keyword.put(:password, System.get_env("PGPASSWORD"))
          |> Keyword.put(:database, System.get_env("PGDATABASE"))
          |> Keyword.put(:hostname, System.get_env("PGHOST"))
          |> Keyword.put(:port, System.get_env("PGPORT") |> String.to_integer)
        {:ok, config}
    end
  end
end
