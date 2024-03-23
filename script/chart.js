export default {
  init: function (target, label) {
    return new Chart(target, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: label,
          data: [],
          borderWidth: 1
        }]
      }
    })
  }
}
