const storage = async (url) => (
  await fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(json => json.EURBRL)
    .then(eurBrl => Number(eurBrl.ask).toFixed(2))
    .then(self.postMessage)
)

self.onmessage = function (event) {
  const url = event.data

  storage(url)
  setInterval(() => storage(url), 5000)
}