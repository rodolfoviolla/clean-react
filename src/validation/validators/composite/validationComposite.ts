import { Validation } from '@/presentation/protocols'
import { FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  private constructor (private readonly validators: FieldValidation[]) {}

  static build (validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (fieldName: string, input: object) {
    const validators = this.validators.filter(validator => validator.name === fieldName)

    let error: Error

    validators.some(validator => {
      error = validator.validate(input)

      return error
    })

    return error?.message
  }
}
