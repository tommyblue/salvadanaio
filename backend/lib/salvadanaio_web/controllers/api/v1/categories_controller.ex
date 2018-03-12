defmodule SalvadanaioWeb.Api.V1.CategoriesController do
  use SalvadanaioWeb, :controller
  alias Salvadanaio.Repo
  alias Salvadanaio.Category
  import Ecto.Query, only: [from: 2]

  def index(conn, _params) do
    categories = Repo.all(from c in Category, order_by: :title)
    render conn, "index.json", categories: categories
  end
end
