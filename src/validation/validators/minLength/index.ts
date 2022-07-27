import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly name: string, private readonly minLength: number) {}

  validate (value: string) {
    return value.length >= this.minLength ? null : new InvalidFieldError(this.name)
  }
}
