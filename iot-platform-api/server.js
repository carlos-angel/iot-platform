'use strict'
const http = require('http')
const express = require('express')
const chalk = require('chalk')

const port = process.env.PORT || 3001
const app = express()
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`${chalk.green('[iot-platform-api]')} server listening on port ${port}`)
})