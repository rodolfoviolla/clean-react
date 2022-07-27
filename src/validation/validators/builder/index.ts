import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor (private readonly name: string, private readonly validations: FieldValidation[]) {}

  static field (name: string): ValidationBuilder {
    return new ValidationBuilder(name, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.name))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
