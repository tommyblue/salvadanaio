defmodule Salvadanaio.AuthAccessPipeline do
  use Guardian.Plug.Pipeline, otp_app: :salvadanaio

  plug Guardian.Plug.Pipeline,
    module: Salvadanaio.Guardian,
    error_handler: Salvadanaio.AuthErrorHandler
  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.LoadResource, allow_blank: false
end
