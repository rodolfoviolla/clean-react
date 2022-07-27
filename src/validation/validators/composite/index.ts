import { Validation } from '@/presentation/protocols'
import { FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: FieldValidation[]) {}

  validate (fieldName: string, fieldValue: string) {
    const validators = this.validators.filter(validator => validator.name === fieldName)

    let error: Error

    validators.some(validator => {
      error = validator.validate(fieldValue)

      return error
    })

    return error?.message
  }
}
