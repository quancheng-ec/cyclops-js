class LogEvent {
  constructor(src, type, extra) {
    this.fileName = src
    this.message = src
    this.name = type
    this.type = type
    this.extra = extra
  }
}

export class AssetsLog extends LogEvent {
  constructor(e) {
    super(e.source, e.type, e)
    this.logger = "assets"
    this.message = `LOAD FAIL: ${e.source}`
  }
}

export class XhrLog extends LogEvent {
  constructor(e) {
    super(e.url, e.type, e)
    this.logger = "xhr"
    this.message = `${e.method} ${e.status}: ${e.url}`
    this.tags = {
      status: e.status
    }
  }
}
