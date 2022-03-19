module.exports = (cli) => {
  cli.addOption({
    name: 'Babel',
    value: 'babel',
    description: 'Transpile modern JavaScript to older versions (for compatibility)',
    checked: true,
  })

  // 添加包
  cli.addPackage((answers, options) => {
    if (answers.features.includes('babel')) {
      options.plugins = {
        "@babel/core": { version: "^7.17.7" },
        "@babel/preset-env": { version: "^7.16.11" },
        "rollup-plugin-babel": { version: "^4.4.0" },
      }
    }
  })
}