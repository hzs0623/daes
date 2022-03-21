const dedent = require('dedent')

function writeRollup(answers, files) {
  const { features = [] } = answers

  let generate = [
    `import resolve from '@rollup/plugin-node-resolve'`,
    `import commonjs from '@rollup/plugin-commonjs'`,
    `import { terser } from 'rollup-plugin-terser'`,
  ]
  const plugins = []

  if (features.includes('babel')) {
    generate.push(`import babel from 'rollup-plugin-babel'`)
    plugins.push(`babel({ exclude: 'node_modules/**' })`)
  }

  if (features.includes('css')) {
    generate.push(`import postcss from 'rollup-plugin-postcss'`)
    plugins.push(`postcss()`)
  }

  const isTs = features.includes('typescript')
  if (isTs) {
    generate.push(`import typescript from '@rollup/plugin-typescript'`)
    plugins.push(`typescript()`)
  }

  files.push({
    fileName: 'rollup.config.js',
    content: dedent`
    ${generate.join('\n')}\n
    export default {
      input: ["./src/index${isTs ? '.ts' : '.js'}"],
      output: {
        file: './dist/bundle.js',//打包后的存放文件
        format: 'umd',//五种输出格式：amd /  es6 / iife / umd / cjs
        name: 'A',  //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
        sourcemap: true  //生成bundle.map.js文件，方便调试
      },
      plugins: [
        resolve(),
        commonjs(),
        terser(), // 压缩代码。 这里可以判断生产环境还是开发环境进行执行
        ${plugins.join(',')}
      ],
    
      // external:['lodash'] //告诉rollup不要将此lodash打包，而作为外部依赖
      // global:{'jquery':'$' //告诉rollup 全局变量$即是jquer }
    }
    `,
  })
}

module.exports = writeRollup
