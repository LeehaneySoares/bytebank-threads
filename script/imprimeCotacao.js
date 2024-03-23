import schema from './schema.js'

class ImprimeCotacao {
  #list
  #listItem
  #nome
  #valor

  get list () {
    return this.#list
  }

  get listItem () {
    return (this.#listItem ??= '')
  }

  get nome () {
    return (this.#nome ??= '')
  }

  get valor () {
    return (this.#valor ??= 0)
  }

  static get maxLimit () {
    return 1000
  }

  constructor (descriptor, list) {
    this.#list = list
    this.#nome = descriptor.label
    this.#valor = Number(descriptor.valor)
  }

  add () {
    this.list.appendChild(this.listItem)
    return this
  }

  change (multiplicador) {
    const nome = ImprimeCotacao.isPlural(this.nome, multiplicador)

    this.listItem.innerHTML = `${multiplicador} ${nome}: R$${(this.valor * multiplicador).toFixed(2)}`
    return this
  }

  createListItem () {
    this.#listItem = document.createElement('li')
    return this
  }

  populate () {
    for (let multiplicador = 1; multiplicador <= ImprimeCotacao.maxLimit; multiplicador *= 10) {
      this
        .createListItem()
        .change(multiplicador)
        .add()
    }
  }

  static create (descriptor) {
    const list = document.querySelector(`[data-lista='${descriptor.label}']`)
    list.innerHTML = ''

    return new ImprimeCotacao(descriptor, list)
  }

  static isPlural (key, value) {
    const label = schema.labels(key)

    return (value > 1)
      ? label.plural
      : label.singular
  }
}

export default ImprimeCotacao