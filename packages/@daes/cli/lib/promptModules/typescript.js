const dedent = require('dedent')

module.exports = cli => {
  cli.addOption({
    name: 'Typescript',
    value: 'typescript',
    description: '项目中是否使用ts写法',
    checked: true,
  })

  // 添加包
  cli.addPackage((answers, options) => {
    if (answers.features.includes('typescript')) {
      Object.assign(options.plugins, {
        "tslib": { version: "^2.3.1" },
        "typescript": { version: "^4.6.2" },
        "@rollup/plugin-typescript": { version: "^8.3.1" },
      })
    }
  })

  // 开发文件
  cli.addFile((answers, files = []) => {
    if (!answers.features.includes('babel')) return

    files.push({
      // dir: '',  // 创建路径
      fileName: 'tsconfig.json',
      content: dedent` 
      {
        "compilerOptions": {
          "lib": [
            "es6"
          ],
          "module": "ESNext",
          "allowJs": true
        },
        "exclude": [
          "node_modules"
        ],
        "include": [
          "src/**/*"
        ],
      }
      `,
    })
  })
}
