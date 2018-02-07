const cjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

module.exports = {
  input: './index.js',
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    name: 'Cyclops'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    cjs()
  ]
}
