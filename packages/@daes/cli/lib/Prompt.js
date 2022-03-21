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

  addFile(fn) {
    this.vm.filePrompt.push(fn)
  }
}

module.exports = Prompt