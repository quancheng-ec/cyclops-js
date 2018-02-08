import { watchGlobalError } from "./error-handler"
import { calculateLoadTimes } from "./performance"
import { getUserFromCookie } from "./get-local-info"
import { watchAsyncCalls } from "./xhr"
import Logger from "./logger"

class Cyclops {
  constructor(conf) {
    this.conf = conf
    this.logger = new Logger()
  }

  send() {}

  start() {
    watchAsyncCalls(this.logger, this.conf)
    watchGlobalError(this.logger, this.conf.errorHandler)
    window.onload = () => calculateLoadTimes(this.logger, this.conf.performance)
  }
}

export default Cyclops
