const cjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')
const json = require('rollup-plugin-json')

module.exports = {
  input: './lib/cyclops.js',
  output: {
    file: 'index.js',
    format: 'umd',
    name: 'Cyclops',
    sourcemap: true
  },
  plugins: [
    json(),
    globals(),
    builtins(),
    babel({
      exclude: 'node_modules/**'
    }),
    nodeResolve({
      jsnext: true,
      main: true
    }),
    cjs()
  ]
}
