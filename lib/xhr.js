import ah from 'ajax-hook'
import parseHeaders from 'parse-headers'

export const watchAsyncCalls = conf => {
  return ah.hookAjax({
    setRequestHeader: getRequestHeaders,
    send: beforeSend,
    onreadystatechange: handleStateChange
  })
}

function getRequestHeaders(kvPair) {
  if (!this._requestHeaders) this._requestHeaders = ''
  this._requestHeaders += `${kvPair[0]}: ${kvPair[1]}\n`
}

function beforeSend(body) {
  this._requestBody = body
  this._cookies = document.cookie
}

function handleStateChange(ctx) {
  if (ctx.readyState === 4 && ctx.status >= 400) {
    console.log(serialize(ctx))
  }
}

function serialize(ctx) {
  return {
    status: ctx.status,
    url: ctx.responseURL,
    response: {
      headers: ctx.getAllResponseHeaders()
    },
    request: {
      headers: ctx._requestHeaders,
      body: ctx._requestBody[0],
      cookies: ctx._cookies
    }
  }
}
