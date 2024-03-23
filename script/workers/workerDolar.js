const storage = async (url) => (
  await fetch(url)
    .then(response => response.json())
    .then(json => json.USDBRL)
    .then(usdBrl => Number(usdBrl.ask).toFixed(2))
    .then(self.postMessage)
)

self.onmessage = function (event) {
  const url = event.data
  
  storage(url)
  setInterval(() => storage(url), 5000)
}