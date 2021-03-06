'use strict'

const debug = require('debug')('iot-platform-db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')

const db = require('./')
const prompt = inquirer.createPromptModule()

async function setup () {

  const flagYes = process.argv.pop() !== '-y'

  if(flagYes){
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])
  
    if (!answer.setup) {
      return console.log('Nothing happened :)')
    }
  }

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

  console.log(`${chalk.green('[success]')} restored database`)
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
