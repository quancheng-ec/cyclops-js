import EventEmitter from "eventemitter3"

const levels = ["error", "debug", "warn"]

class Logger extends EventEmitter {
  constructor() {
    super()

    levels.forEach(type => {
      this[type] = payload => this.log(type, payload)
    })

    this.on("log", e => {
      console.log(`${e.type}: `, e.payload)
    })
  }

  log(type, payload) {
    this.emit("log", {
      type,
      payload
    })
  }
}

export default Logger
