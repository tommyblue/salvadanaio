# Accounts
a1 = Salvadanaio.Repo.insert!(%Salvadanaio.Account{
  name: "Fineco",
  balance: Money.new(0, :EUR),
  balance_update_date: Date.utc_today()
})
a2 = Salvadanaio.Repo.insert!(%Salvadanaio.Account{
  name: "MPS",
  balance: Money.new(0, :EUR),
  balance_update_date: Date.utc_today()
})

# Movements
Salvadanaio.Services.Movements.insert_movement(%Salvadanaio.Movement{
  account: a1,
  operation_date: Date.utc_today(),
  value_date: Date.utc_today(),
  amount: Money.new(1012, :EUR),
  short_description: "Fake movement",
  description: "Fake movement, but longer",
})
Salvadanaio.Services.Movements.insert_movement(%Salvadanaio.Movement{
  account: a2,
  operation_date: Date.utc_today(),
  value_date: Date.utc_today(),
  amount: Money.new(5233, :EUR),
  short_description: "Fake movement",
  description: "Fake movement, but longer",
})
Salvadanaio.Services.Movements.insert_movement(%Salvadanaio.Movement{
  account: a1,
  operation_date: Date.utc_today(),
  value_date: Date.utc_today(),
  amount: Money.new(6503, :EUR),
  short_description: "Fake movement",
  description: "Fake movement, but longer",
})
