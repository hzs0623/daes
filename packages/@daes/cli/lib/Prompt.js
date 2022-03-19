class Prompt {
  constructor(vm) {
    this.vm = vm
  }

  addOption(option) {
    this.vm.featurePrompt.choices.push(option)
  }

  addPackage(fn) {
    this.vm.promptCompleteCbs.push(fn)
  }
}

module.exports = Prompt