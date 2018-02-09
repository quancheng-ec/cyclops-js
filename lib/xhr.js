import ah from "ajax-hook"
import * as ErrorTypes from "./error-types"
import { XhrLog } from "./custom-error"

export const watchAsyncCalls = logger => {
  ah.hookAjax({
    setRequestHeader: getRequestHeaders,
    send: beforeSend,
    open: beforeOpen,
    onreadystatechange: handleStateChange
  })
  function beforeOpen([method]) {
    this._method = method
  }
  function getRequestHeaders(kvPair) {
    if (!this._requestHeaders) this._requestHeaders = ""
    this._requestHeaders += `${kvPair[0]}: ${kvPair[1]}\n`
  }

  function beforeSend(body) {
    this._requestBody = body
    this._cookies = document.cookie
  }

  function handleStateChange(ctx) {
    if (ctx.readyState === 4 && ctx.status >= 400) {
      logger.log("error", new XhrLog(serialize(ctx)))
    }
  }
}

function serialize(ctx) {
  return {
    type: ErrorTypes.XHR_RESPONSE_ERR,
    status: ctx.status,
    url: ctx.responseURL,
    method: ctx._method,
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
