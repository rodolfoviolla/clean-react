import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor (readonly name: string) {}

  validate (value: string) {
    return new InvalidFieldError(this.name)
  }
}
