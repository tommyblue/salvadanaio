defmodule Salvadanaio.Movement do
  use Ecto.Schema
  import Ecto.Changeset
  alias Salvadanaio.Movement
  alias Salvadanaio.Account
  alias Salvadanaio.Category

  schema "movements" do
    belongs_to :account, Account
    belongs_to :category, Category
    field :operation_date, :date
    field :value_date, :date
    field :amount, Money.Ecto.Type
    field :short_description, :string
    field :description, :string
    timestamps()
  end

  @doc false
  def changeset(%Movement{} = movement, attrs) do
    movement
    |> cast(attrs, [:account_id, :category_id, :operation_date, :value_date, :amount, :short_description, :description])
    |> validate_required([:account_id, :operation_date, :amount, :short_description])
  end
end
