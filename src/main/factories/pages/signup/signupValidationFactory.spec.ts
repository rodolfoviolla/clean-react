import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

import { makeValidation } from './signupValidationFactory'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validation', () => {
    const composite = makeValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('name').required().min(5).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().sameAs('password').build()
    ]))
  })
})
