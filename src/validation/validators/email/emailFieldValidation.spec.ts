import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'

import { EmailValidation } from '.'

describe('RequiredFieldValidation', () => {
  test('Should return error if email is invalid', () => {
    const fieldName = faker.random.word()
    const sut = new EmailValidation(fieldName)
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if email is valid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
