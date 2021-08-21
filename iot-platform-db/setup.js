'use strict'

const debug = require('debug')('iot-platform-db:setup')
const db = require('./')

async function setup () {
  const config = {
    database: process.env.DB_NAME || 'iot_platform',
    username: process.env.DB_USER || 'iot_platform',
    password: process.env.DB_PASSWORD || 'iot_platform',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()