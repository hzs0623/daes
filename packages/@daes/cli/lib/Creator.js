const Prompt = require('./Prompt.js')
const inquirer = require('inquirer')
const { chalk, resolvePkg, hasGit, execa } = require('@daes/cli-utils')
const { createFile } = require('./createFile')
const writeRollup = require('./writeRollup')
const dedent = require('dedent')

class Creator {
  constructor(name, dir, modules) {
    this.projectName = name
    this.dir = dir

    const { featurePrompt } = this.resolveIntroPrompts()
    this.promptCompleteCbs = [] // 插件包文件参数
    this.featurePrompt = featurePrompt // 选项集合
    this.filePrompt = [] // 创建文件
    const prompt = new Prompt(this)
    modules.forEach(m => m(prompt))
  }

  async create(options) {
    const { answers, preset, files } = await this.promptResolvePreset()

    console.log(`✨  Creating project in ${chalk.yellow(this.dir)}.`)

    this.writePackage(preset)
    this.writeMain(answers)
    
    console.log()
    console.log(`🚀  Invoking generators...`)
    this.executeFile(answers, files)

    const shouldInitGit = this.shouldInitGit(options)
    if (shouldInitGit) {
      console.log()
      console.log(`🗃  Initializing git repository...`)
      this.writeGit()
      await this.run('git init')
    }
  
    
    console.log()
    console.log(`⚙\u{fe0f}  Installing CLI plugins. This might take a while...`)
    await this.run('npm install')

    console.log()
    console.log('📄  Generating README.md...')
    this.writeReadme()

    console.log()
    console.log(`🎉  Successfully created project ${chalk.yellow(this.projectName)}.`)
  }

  run (command, args) {
    if (!args) { [command, ...args] = command.split(/\s+/) } // 空格分隔 git init
    return execa(command, args, { cwd: this.dir })
  }
  
  writeReadme() {
    const readmeContent = dedent`
    # \`${this.projectName}\`

    > "TODO: description"

    ## Usage

    \`\`\`
    // TODO: DEMONSTRATE API
    \`\`\`
   `
    createFile(this.dir, 'README.md', readmeContent)
  }

  writeGit() {
    createFile(this.dir, '.gitignore', dedent`
      /node_modules/
    `)
  }

  writeMain(answers) {
    const suffix = answers.features.includes('typescript') ? '.ts' : '.js'
    createFile(
      this.dir,
      `src/index${suffix}`,
      dedent`
      const info = 'hello world'
      console.log(info)
    `
    )
  }

  writePackage(preset) {
    const pkg = {
      name: this.projectName,
      version: '0.1.0',
      private: true,
      scripts: {
        build: 'rollup --config',
      },
      keywords: [],
      author: '',
      devDependencies: {},
      ...resolvePkg(this.dir), // 优先用创建前package.json
    }

    const deps = Object.keys(preset.plugins)
    deps.forEach(dep => {
      let { version = 'latest' } = preset.plugins[dep] // 最新版本
      pkg.devDependencies[dep] = version // 添加包进去
    })

    createFile(this.dir, 'package.json', JSON.stringify(pkg, null, 2))
  }

  async promptResolvePreset() {
    const answers = await inquirer.prompt([this.featurePrompt])
    const preset = { plugins: {} } // 对象可以地址引用
    const files = []
    answers.features = answers.features || []

    // 添加所有包名回调
    this.promptCompleteCbs.forEach(cb => cb(answers, preset))
    // 生成相关文件
    this.filePrompt.forEach(cb => cb(answers, files))

    return { answers, preset, files }
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

  executeFile(answers, files) {
    writeRollup(answers, files)

    files.forEach(({ fileName, content, dir }) => {
      dir = dir || this.dir
      createFile(dir, fileName, content)
    })
  }

  shouldInitGit(cliOptions) {
    if (!hasGit()) {
      return false
    }
    // --no-git
    if (cliOptions.git === false || cliOptions.git === 'false') {
      return false
    }
    return true
  }
}

module.exports = Creator
