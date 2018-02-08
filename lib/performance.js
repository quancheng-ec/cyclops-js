import * as ErrorTypes from "./error-types"

export const calculateLoadTimes = (logger, conf = {}) => {
  if (performance === undefined) {
    console.log("= Calculate Load Times: performance NOT supported")
    return
  }

  const resources = performance.getEntriesByType("resource")

  if (resources === undefined || resources.length <= 0) {
    console.log("= Calculate Load Times: there are NO `resource` performance records")
    return
  }

  resources.forEach(res => {
    const times = serializeResourceTime(res)
    if (times.duration >= (conf.max_duration || 10000)) {
      times.type = ErrorTypes.ASSETS_LOAD_SLOW
      logger.warn(times)
    }
  })
}

function serializeResourceTime(res) {
  return {
    name: res.name,
    redirectTime: res.redirectEnd - res.redirectStart,
    dnsTime: res.domainLookupEnd - res.domainLookupStart,
    tcpHandshakeTime: res.connectEnd - res.connectStart,
    secureTime: res.secureConnectionStart > 0 ? res.connectEnd - res.secureConnectionStart : "0",
    responseTime: res.responseEnd - res.responseStart,
    duration: res.startTime > 0 ? res.responseEnd - res.startTime : "0"
  }
}
