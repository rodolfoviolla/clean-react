export class UnexpectedError extends Error {
  constructor () {
    super('Ocorreu um erro inesperado. Tente novamente mais tarde')
    this.name = 'UnexpectedError'
  }
}
