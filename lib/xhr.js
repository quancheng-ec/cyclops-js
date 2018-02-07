exports.addInterruptor = func => {
  if (XMLHttpRequest.callbacks) {
    XMLHttpRequest.callbacks.push(callback)
  } else {
    XMLHttpRequest.callbacks = [callback]
    const oldSend = XMLHttpRequest.prototype.send

    XMLHttpRequest.prototype.send = () => {
      for (let i = 0; i < XMLHttpRequest.callbacks.length; i++) {
        XMLHttpRequest.callbacks[i](this)
      }
      oldSend.apply(this, arguments)
    }
  }
}