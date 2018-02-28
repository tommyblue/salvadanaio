defmodule SalvadanaioWeb.Api.V1.CategoriesView do
  use SalvadanaioWeb, :view

  def render("index.json", %{categories: categories}) do
    %{data: render_many(categories, __MODULE__, "category.json", as: :category)}
  end

  def render("show.json", %{category: category}) do
    %{data: render_one(category, __MODULE__, "category.json", as: :category)}
  end

  def render("category.json", %{category: category}) do
    %{
      id: category.id,
      identifier: category.identifier,
      title: category.title,
    }
  end
end
