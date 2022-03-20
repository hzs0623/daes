const Prompt = require('./Prompt.js')
const inquirer = require('inquirer')
const { chalk } = require('@daes/cli-utils')

class Creator {
  constructor(name, dir, modules) {
    this.projectName = name
    this.dir = dir

    const { featurePrompt } = this.resolveIntroPrompts()
    this.promptCompleteCbs = [] // 插件包文件参数
    this.featurePrompt = featurePrompt // 选项集合
    const prompt = new Prompt(this)
    modules.forEach(m => m(prompt))
  }

  async create(options) {
    const { answers, preset } = await this.promptResolvePreset()

    console.log(chalk.red('123'))
  }

  async promptResolvePreset() {
    const answers = await inquirer.prompt([this.featurePrompt])

    const preset = { plugins: {} } // 对象可以地址引用
    answers.features = answers.features || []

    // 触发所有包名回调
    this.promptCompleteCbs.forEach(cb => cb(answers, preset))

    return { answers, preset }
  }

  resolveIntroPrompts() {
    const featurePrompt = {
      name: 'features',
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: [],
      pageSize: 10,
    }
    return { featurePrompt }
  }
}

module.exports = Creator
