;(function() {
  fetch("/api/test")
  axios.get("/api/test")
  axios.get("/api/404?a=1", {
    headers: {
      a: 1
    }
  })
  axios.post(
    "/api/404",
    {
      a: 1,
      b: 2,
      c: 3
    },
    {
      headers: {
        b: 1
      }
    }
  )
  console.log(a.b)
})()
