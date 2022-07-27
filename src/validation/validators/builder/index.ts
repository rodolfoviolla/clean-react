import { FieldValidation } from '@/validation/protocols'
import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'

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

  min (length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.name, length))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
