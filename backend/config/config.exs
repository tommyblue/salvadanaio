# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :salvadanaio,
  ecto_repos: [Salvadanaio.Repo]

# Configures the endpoint
config :salvadanaio, SalvadanaioWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "etfk5SPmZ/e9v3V+ugSedtfMBGgOYhbXTWl+TIM60kuFA+LDTb1y7a9TKtMW4oe6",
  render_errors: [view: SalvadanaioWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Salvadanaio.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Money
config :money,
  default_currency: :EUR,
  separator: ".",
  delimeter: ",",
  symbol: false,
  symbol_on_right: false,
  symbol_space: false

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
