defmodule Salvadanaio.Movement do
  use Ecto.Schema
  import Ecto.Changeset
  alias Salvadanaio.Movement
  alias Salvadanaio.Account

  schema "movements" do
    belongs_to :account, Account
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
    |> cast(attrs, [:account, :operation_date, :value_date, :amount, :short_description, :description])
    |> validate_required([:account, :operation_date, :amount, :short_description])
  end
end
