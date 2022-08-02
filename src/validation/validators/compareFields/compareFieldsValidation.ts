import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly name: string, private readonly fieldToCompare: string) {}

  validate (input: object): Error {
    return input[this.name] !== input[this.fieldToCompare] ? new InvalidFieldError(this.name) : null
  }
}
