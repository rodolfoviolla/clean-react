import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly name: string) {}

  validate (input: object) {
    return input[this.name] ? null : new RequiredFieldError()
  }
}
