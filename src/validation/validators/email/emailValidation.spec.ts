import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'

import { EmailValidation } from './emailValidation'

const makeSut = () => {
  const fieldName = faker.database.column()
  const sut = new EmailValidation(fieldName)

  return { sut, fieldName }
}

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate({ [fieldName]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if email is valid', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate({ [fieldName]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate({ [fieldName]: '' })
    expect(error).toBeFalsy()
  })
})
