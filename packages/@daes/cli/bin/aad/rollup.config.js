import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

export default {
  input: ["./src/index.js"],
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
    babel({
  exclude: 'node_modules/**', // 不编译当前文件下内容 
})
  ],

  // external:['lodash'] //告诉rollup不要将此lodash打包，而作为外部依赖
  // global:{'jquery':'$' //告诉rollup 全局变量$即是jquer }
}
