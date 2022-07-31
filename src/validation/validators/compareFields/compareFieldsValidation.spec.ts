import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'

import { CompareFieldsValidation } from './compareFieldsValidation'

const makeSut = () => {
  const fieldName = faker.database.column()
  const valueToCompare = faker.random.word()
  const sut = new CompareFieldsValidation(fieldName, valueToCompare)

  return { sut, fieldName, valueToCompare }
}

describe('CompareFieldsValidation', () => {
  test('Should return error if comparison is invalid', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if comparison is valid', () => {
    const { sut, valueToCompare } = makeSut()
    const error = sut.validate(valueToCompare)
    expect(error).toBeFalsy()
  })
})
