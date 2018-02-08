const path = require('path')
const express = require('express')
const rollup = require('rollup')
const rollupConfig = require('../rollup.config')
const app = express()

rollup.watch(rollupConfig)

app.use('/', express.static(__dirname))
app.get('/index.js', express.static(path.resolve(__dirname, '../')))
app.get('/api/test', (req, res) =>
  res.send({
    name: 'test'
  })
)

app.listen(3000)
