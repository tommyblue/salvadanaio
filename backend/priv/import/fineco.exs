parsed = OptionParser.parse(System.argv)

case parsed do
	# {[verbose: true], [filepath], _} -> FinecoImport.run_verbose(filepath)
	{_, [filepath], _} -> Salvadanaio.Import.Fineco.run(filepath)
	_ -> Salvadanaio.Import.Fineco.help
end
