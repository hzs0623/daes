exports.getPromptModules = () => {
  return ['babel'].map(file => require(`./promptModules/${file}`))
}