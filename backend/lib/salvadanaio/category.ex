defmodule Salvadanaio.Category do
  use Ecto.Schema
  import Ecto.Changeset
  alias Salvadanaio.Category
  alias Salvadanaio.Movement
  alias Salvadanaio.Repo

  schema "categories" do
    has_many :movements, Movement
    field :identifier, :string
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(%Category{} = category, attrs) do
    category
    |> cast(attrs, [:title, :identifier])
    |> validate_required([:title, :identifier])
    |> unique_constraint([:title, :identifier])
  end

  def get_category(desc, short_desc) do
    cond do
      short_desc == "Prel.ns.sport.automatico" or short_desc == "Prelievo Bancomat" ->
        Repo.get_by!(Category, identifier: "atm").id

      short_desc == "PagoBancomat POS" ->
        Repo.get_by!(Category, identifier: "acquisti").id

      short_desc == "Pagamento Visa Debit" ->
        Repo.get_by!(Category, identifier: "acquisti").id

      short_desc == "Ricarica carta ricaricabile" or short_desc == "Consegna/ricar.carta prep" ->
        Repo.get_by!(Category, identifier: "acquisti").id

      short_desc == "Stipendio" ->
        Repo.get_by!(Category, identifier: "stipendio").id

      short_desc == "Imposta bollo conto corrente" ->
        Repo.get_by!(Category, identifier: "banca").id

      short_desc == "Ricarica telefonica" ->
        Repo.get_by!(Category, identifier: "telefonia").id

      short_desc == "SEPA Direct Debit" and Regex.match?(~r/fastweb/ui, desc) ->
        Repo.get_by!(Category, identifier: "telefonia").id

      short_desc == "SEPA Direct Debit" and Regex.match?(~r/integra/ui, desc) ->
        Repo.get_by!(Category, identifier: "coop").id

      short_desc == "Bonifico SEPA Italia" and Regex.match?(~r/condominio/ui, desc) ->
        Repo.get_by!(Category, identifier: "casa").id

      short_desc == "Addebito direct debit" and (
        Regex.match?(~r/pagamento acqua/ui, desc) or
        Regex.match?(~r/servizio elettrico/ui, desc) or
        Regex.match?(~r/estra energie/ui, desc)
      ) ->
        Repo.get_by!(Category, identifier: "casa").id

      short_desc == "Premio pol.axa mps danni" ->
        Repo.get_by!(Category, identifier: "casa").id

      short_desc == "Pagamento rata di mutuo" ->
        Repo.get_by!(Category, identifier: "casa").id

      short_desc == "Accr.emolumenti altro ist" and Regex.match?(~r/stipendio/ui, desc) ->
        Repo.get_by!(Category, identifier: "stipendio").id

      true -> nil
    end
  end
end
