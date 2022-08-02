import { faker } from '@faker-js/faker'

import { RequiredFieldError } from '@/validation/errors'

import { RequiredFieldValidation } from './requiredFieldValidation'

const makeSut = () => {
  const fieldName = faker.database.column()
  const sut = new RequiredFieldValidation(fieldName)

  return { sut, fieldName }
}

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate({ [fieldName]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate({ [fieldName]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
