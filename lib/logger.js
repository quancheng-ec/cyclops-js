const { getLogger, configure } = require('log4js')

configure({
  appenders: {
    consoleLog: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: []
    }
  }
})

module.exports = getLogger()
