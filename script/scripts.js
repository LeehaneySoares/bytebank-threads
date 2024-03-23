import ImprimeCotacao from './imprimeCotacao.js'
import schema from './schema.js'
import url from './url.js'

function pegarHorario () {
  const date = new Date()
  const formatedHours = new Intl.DateTimeFormat('pt-BR', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const hours = formatedHours.format(date)

  return hours
}

function alteraValorChart (grafico, legenda, valor) {
  grafico.data.labels.push(legenda)
  grafico.data.datasets.forEach(dataset => dataset.data.push(valor))
  grafico.update()
}

function updateChart (valor, { grafico, label }) {
  const currentHour = pegarHorario()

  alteraValorChart(grafico, currentHour, valor)
  ImprimeCotacao
    .create({ valor, label })
    .populate()
}

const workerDolar = new Worker('./script/workers/workerDolar.js')
workerDolar.postMessage(`${url}/USD-BRL`)
workerDolar.onmessage = (event) => updateChart(event.data, schema.dolar)

const workerIene = new Worker('./script/workers/workerIene.js')
workerIene.postMessage(`${url}/JPY-BRL`)
workerIene.onmessage = (event) => updateChart(event.data, schema.iene)

const workerEuro = new Worker('./script/workers/workerEuro.js')
workerEuro.postMessage(`${url}/EUR-BRL`)
workerEuro.onmessage = (event) => updateChart(event.data, schema.euro)
