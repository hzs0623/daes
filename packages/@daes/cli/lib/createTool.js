exports.getPromptModules = () => {
  return ['babel', 'typescript'].map(file => require(`./promptModules/${file}`))
}