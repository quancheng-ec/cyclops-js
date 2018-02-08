export const watchGlobalError = (conf = {}) => {
  window.addEventListener('error', handleError(conf), true)
  window.addEventListener(
    'unhandledrejection',
    event => {
      console.warn(
        'WARNING: Unhandled promise rejection. Shame on you! Reason: ' +
          event.reason
      )
    },
    true
  )
  window.addEventListener('rejectionhandled', event => {
    console.log('REJECTIONHANDLED')
  })
}

function handleError(conf) {
  return e => {
    console.log('catch error: ', formatError(e))
    conf.callback && conf.callback()
    if (conf.prevent) {
      e.preventDefault()
    }
  }
}

function formatError(errorEvent) {
  if (errorEvent.filename) {
    return {
      type: 'script',
      source: errorEvent.filename,
      message: errorEvent.message,
      lineNo: errorEvent.lineno,
      colNo: errorEvent.colno
    }
  }
  return {
    type: 'assets',
    source: errorEvent.srcElement.src
  }
}
