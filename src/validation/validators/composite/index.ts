import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/fieldValidation'

export class ValidationComposite implements Validation {
  private constructor (private readonly validators: FieldValidation[]) {}

  static build (validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

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
