import { InvalidFieldError } from '@/validation/errors'

import { EmailValidation } from '.'

describe('RequiredFieldValidation', () => {
  test('Should return error if email is invalid', () => {
    const fieldName = 'email'
    const sut = new EmailValidation(fieldName)
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })
})
