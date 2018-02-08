export const generateTraceId = () =>
  Math.random()
    .toString(36)
    .slice(2) + new Date().getTime()
