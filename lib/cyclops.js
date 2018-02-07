const { onGlobalError } = require('./error-handler')
const { calculateLoadTimes } = require('./performance')
const { getUserFromCookie } = require('./get-user')

class Cyclops {
  constructor(conf) {
    this.user = getUserFromCookie()
  }

  start() {
    window.onerror = onGlobalError
    calculateLoadTimes()
    document.addEventListener('error', e => {
      console.error(e)
    })
  }
}

module.exports = Cyclops
