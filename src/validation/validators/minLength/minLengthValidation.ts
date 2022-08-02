import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly name: string, private readonly minLength: number) {}

  validate (input: object) {
    return input[this.name]?.length < this.minLength ? new InvalidFieldError(this.name) : null
  }
}
