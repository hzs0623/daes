const dedent = require('dedent')

module.exports = cli => {
  cli.addOption({
    name: 'Babel',
    value: 'babel',
    description:
      'Transpile modern JavaScript to older versions (for compatibility)',
    checked: true,
  })

  // 添加包
  cli.addPackage((answers, options) => {
    if (answers.features.includes('babel')) {
      options.plugins = {
        '@babel/core': { version: '^7.17.7' },
        '@babel/preset-env': { version: '^7.16.11' },
        'rollup-plugin-babel': { version: '^4.4.0' },
      }
    }
  })

  // 开发文件
  cli.addFile((answers, files = []) => {
    if (!answers.features.includes('babel')) return

    files.push({
      // dir: '',  // 创建路径
      fileName: '.babelrc',
      content: dedent`{
        "presets": [
          [
            "@babel/env",
            {
              "modules": false // 设置为false,否则babel会在rollup有机会执行其操作之前导致我们的模块转化为commonjs
            }
          ]
        ]
      }
      `,
    })
  })
}
