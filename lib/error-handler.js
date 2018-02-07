exports.onGlobalError = (message, source, line, col, error) => {
  console.log({
    message: error.message,
    source,
    line,
    col
  })
}
