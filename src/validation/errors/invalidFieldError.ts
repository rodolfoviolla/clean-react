export class InvalidFieldError extends Error {
  constructor (readonly fieldName: string) {
    super(`${fieldName.toUpperCase()}: Campo inválido`)
    this.name = 'InvalidFieldError'
  }
}
