defmodule Salvadanaio.Account do
  use Ecto.Schema
  import Ecto.Changeset
  alias Salvadanaio.Account
  alias Salvadanaio.Movement
  alias Salvadanaio.Repo

  schema "accounts" do
    has_many :movements, Movement
    field :name, :string
    field :balance, Money.Ecto.Type
    field :balance_update_date, :date
    timestamps()
  end

  @doc false
  def changeset(%Account{} = account, attrs) do
    account
    |> cast(attrs, [:name, :balance, :balance_update_date])
    |> validate_required([:name])
  end

  def update_balance(account_id, amount) do
    account = Repo.get!(Account, account_id)
    balance = Money.add(account.balance, amount)
    changeset = Account.changeset(account, %{balance: balance, balance_update_date: Date.utc_today()})
    Repo.update(changeset)
  end
end
