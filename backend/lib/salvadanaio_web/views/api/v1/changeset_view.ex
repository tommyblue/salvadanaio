defmodule SalvadanaioWeb.Api.V1.ChangesetView do
  use SalvadanaioWeb, :view

  def render "error.json", %{changeset: changeset} do
    %{errors: Enum.map(changeset.errors, fn {key, reason} ->
        %{key => parse_reason(reason)}
      end)
     }
  end

  def parse_reason({reason, _}) do
    reason
  end

  def parse_reason(msg) do
    msg
  end

  # JSONAPI compatible response
  #
  # def render("error.json", %{changeset: changeset}) do
  #   errors = Enum.map(changeset.errors, fn {field, detail} ->
  #     %{
  #       title: "Invalid Attribute",
  #       detail: render_detail(detail)
  #     }
  #   end)

  #   %{errors: errors}
  # end

  # def render_detail({message, values}) do
  #   Enum.reduce values, message, fn {k, v}, acc ->
  #     String.replace(acc, "%{#{k}}", to_string(v))
  #   end
  # end

  # def render_detail(message) do
  #   message
  # end
end
