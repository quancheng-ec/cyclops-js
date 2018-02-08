import { watchGlobalError } from './error-handler'
import { calculateLoadTimes } from './performance'
import { getUserFromCookie } from './get-local-info'
import { watchAsyncCalls } from './xhr'
import { generateTraceId } from './utils'

class Cyclops {
  constructor(conf) {
    this.conf = conf
    this._baseInfo = {
      user: getUserFromCookie(),
      traceId: generateTraceId()
    }
  }

  send(level) {}

  start() {
    watchAsyncCalls(this.conf)
    watchGlobalError(this.conf.errorHandler)
    window.onload = calculateLoadTimes
  }
}

export default Cyclops
