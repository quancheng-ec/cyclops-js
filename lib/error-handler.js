export const onGlobalError = (message, source, line, col, error) => {
  if (error) {
    console.log({
      type: error.name,
      message: error.message,
      source,
      line,
      col
    })
  }
}
