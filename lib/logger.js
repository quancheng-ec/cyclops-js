import EventEmitter from "eventemitter3"
import { generateTraceId } from "./utils"

const levels = ["error", "debug", "warning"]

class Logger extends EventEmitter {
  constructor(conf) {
    super()

    this.id = generateTraceId()

    levels.forEach(type => {
      this[type] = payload => this.log(type, payload)
    })

    this.on("log", e => {
      if (!e.payload) return
      const { type, extra, logger, tags, fileName } = e.payload
      Raven.captureMessage(e.payload.message, {
        tags: Object.assign(
          {
            url: fileName,
            category: type
          },
          tags
        ),
        logger,
        level: e.type,
        extra: extra
      })
      // Raven.captureMessage(e.payload.type, {
      //   tags: {
      //     category: e.payload.type
      //   },
      //   level: e.type,
      //   extra: e.payload
      // })
      // fetch("//localhost:4000/error", {
      //   method: "POST",
      //   body: JSON.stringify(e.payload),
      //   headers: new Headers({ "Content-Type": "application/json", "X-Error-Type": e.payload.type })
      // })
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
