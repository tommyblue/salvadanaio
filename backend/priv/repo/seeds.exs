Salvadanaio.Repo.insert!(Salvadanaio.User.changeset(%Salvadanaio.User{}, %{
  email: "tommaso.visconti@gmail.com",
  password: "s3cr3t"
}))

Salvadanaio.Repo.insert!(%Salvadanaio.Category{
  title: "Stipendio",
  identifier: "stipendio"
})

Salvadanaio.Repo.insert!(%Salvadanaio.Category{
  title: "COOP",
  identifier: "coop"
})

Salvadanaio.Repo.insert!(%Salvadanaio.Category{
  title: "Acquisti",
  identifier: "acquisti"
})

Salvadanaio.Repo.insert!(%Salvadanaio.Category{
  title: "Mutuo",
  identifier: "mutuo",
})

Salvadanaio.Repo.insert!(%Salvadanaio.Category{
  title: "Spese bancarie",
  identifier: "banca",
})

Salvadanaio.Repo.insert!(%Salvadanaio.Category{
  title: "Telefonia",
  identifier: "telefonia",
})

Salvadanaio.Repo.insert!(%Salvadanaio.Category{
  title: "Casa",
  identifier: "casa",
})

Salvadanaio.Repo.insert!(%Salvadanaio.Category{
  title: "Mezzi di trasporto",
  identifier: "trasporti",
})

Salvadanaio.Repo.insert!(%Salvadanaio.Category{
  title: "Salute",
  identifier: "salute",
})

Salvadanaio.Repo.insert!(%Salvadanaio.Category{
  title: "ATM",
  identifier: "atm",
})
