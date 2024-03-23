import Chart from './chart.js'

export default {
  dolar: {
    grafico: Chart.init(document.getElementById('graficoDolar'), 'Dólar'),
    label: 'Dólar'
  },
  iene: {
    grafico: Chart.init(document.getElementById('graficoIene'), 'Iene'),
    label: 'Iene'
  },
  euro: {
    grafico: Chart.init(document.getElementById('graficoEuro'), 'Euro'),
    label: 'Euro'
  },
  labels: (target) => ({
    'Dólar': {
      singular: 'Dólar',
      plural: 'Dólares'
    },
    'Iene': {
      singular: 'Iene',
      plural: 'Ienes'
    },
    'Euro': {
      singular: 'Euro',
      plural: 'Euros'
    }
  }[target])
}