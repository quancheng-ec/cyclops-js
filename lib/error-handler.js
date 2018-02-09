import * as ErrorTypes from "./error-types"
import { AssetsLog } from "./custom-error"
export const watchGlobalError = (logger, conf = {}) => {
  window.addEventListener("error", handleError(logger, conf), true)
  window.addEventListener(
    "unhandledrejection",
    event => {
      console.warn("WARNING: Unhandled promise rejection. Shame on you! Reason: " + event.reason)
    },
    true
  )
  window.addEventListener("rejectionhandled", event => {
    console.log("REJECTIONHANDLED")
  })
}

function handleError(logger, conf) {
  return e => {
    logger.error(formatError(e))
    conf.callback && conf.callback()
    if (conf.prevent) {
      e.preventDefault()
    }
  }
}

function formatError(errorEvent) {
  if (errorEvent.filename) {
    // return {
    //   type: ErrorTypes.SCRIPT_UNCAUGHT_ERR,
    //   source: errorEvent.filename,
    //   message: errorEvent.message,
    //   lineNo: errorEvent.lineno,
    //   colNo: errorEvent.colno
    // }
    return null
  }
  return new AssetsLog({
    type: ErrorTypes.ASSETS_LOAD_FAIL,
    source: errorEvent.srcElement.src,
    node: errorEvent.srcElement.nodeName
  })
}
