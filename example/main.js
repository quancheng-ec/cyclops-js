;(function() {
  console.log(1)
  fetch('/api/test')
    .then(res => res.json())
    .then(console.log)
  console.log(a.b)
})()
