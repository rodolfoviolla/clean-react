export class InvalidFieldError extends Error {
  constructor (readonly fieldName: string) {
    super('Campo inválido')
    this.name = 'InvalidFieldError'
  }
}
