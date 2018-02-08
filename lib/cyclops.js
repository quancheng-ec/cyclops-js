import { onGlobalError } from './error-handler'
import { calculateLoadTimes } from './performance'
import { getUserFromCookie } from './get-user'
import { addInterruptor } from './xhr'

class Cyclops {
  constructor(conf) {
    this.user = getUserFromCookie()
    this.conf = conf
    this.traceId =
      Math.random()
        .toString(36)
        .slice(2) + new Date().getTime()
  }

  send(level) {}

  start() {
    addInterruptor(e => console.log(e))
    window.onerror = onGlobalError
    window.onload = calculateLoadTimes
    window.addEventListener('error', e => {
      e.preventDefault()
    })
  }
}

export default Cyclops
