#!/usr/bin/env node

const { program } = require('commander')

// 定义当前版本
program
  .version(`@daes/cli ${require('../package').version}`)
  .usage('<command> [options]')

program
  .command('create')
  .argument('<app-name>', '创建项目名称')
  .description('Create a JS packaging Library')
  .action((name, options) => {
    if ((process.argv.slice(3)).length > 1) {
      console.info('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.')
    }
   
    require('../lib/create')(name, options)
  })


// 解析命令行参数
program.parse(process.argv)
