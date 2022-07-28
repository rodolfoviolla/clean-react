import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/fieldValidation'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly name: string) {}

  validate (value: string) {
    return value ? null : new RequiredFieldError()
  }
}
