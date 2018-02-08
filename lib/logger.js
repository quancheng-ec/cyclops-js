import EventEmitter from "eventemitter3"
import { generateTraceId } from "./utils"

const levels = ["error", "debug", "warn"]

class Logger extends EventEmitter {
  constructor(conf) {
    super()

    this.id = generateTraceId()

    levels.forEach(type => {
      this[type] = payload => this.log(type, payload)
    })

    this.on("log", e => {
      console.log(`${e.type}: `, e.payload)
      fetch("//localhost:4000/error", {
        method: "POST",
        body: JSON.stringify(e.payload),
        headers: new Headers({ "Content-Type": "application/json" })
      })
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
