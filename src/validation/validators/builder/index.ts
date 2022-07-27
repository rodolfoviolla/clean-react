import { FieldValidation } from '@/validation/protocols'
import { EmailValidation, RequiredFieldValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor (private readonly name: string, private readonly validations: FieldValidation[]) {}

  static field (name: string): ValidationBuilder {
    return new ValidationBuilder(name, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.name))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.name))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
