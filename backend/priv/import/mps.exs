parsed = OptionParser.parse(System.argv)

case parsed do
	# {[verbose: true], [filepath], _} -> MpsImport.run_verbose(filepath)
	{_, [filepath], _} -> Salvadanaio.Import.Mps.run(filepath)
	_ -> Salvadanaio.Import.Mps.help
end
