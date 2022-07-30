export class EmailInUseError extends Error {
  constructor () {
    super('Este e-mail está em uso')
    this.name = 'EmailInUseError'
  }
}
