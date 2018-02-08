export const calculateLoadTimes = () => {
  if (performance === undefined) {
    console.log('= Calculate Load Times: performance NOT supported')
    return
  }

  const resources = performance.getEntriesByType('resource')

  if (resources === undefined || resources.length <= 0) {
    console.log('= Calculate Load Times: there are NO `resource` performance records')
    return
  }

  for (const res of resources) {
    console.log({
      name: res.name,
      redirectTime: res.redirectEnd - res.redirectStart,
      dnsTime: res.domainLookupEnd - res.domainLookupStart,
      tcpHandshakeTime: res.connectEnd - res.connectStart,
      secureTime: res.secureConnectionStart > 0 ? res.connectEnd - res.secureConnectionStart : '0',
      responseTime: res.responseEnd - res.responseStart,
      duration: res.startTime > 0 ? res.responseEnd - res.startTime : '0'
    })
  }
}
