import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'

import { CompareFieldsValidation } from './compareFieldsValidation'

const makeSut = () => {
  const fieldName = faker.database.column()
  const fieldToCompare = faker.database.column()
  const sut = new CompareFieldsValidation(fieldName, fieldToCompare)

  return { sut, fieldName, fieldToCompare }
}

describe('CompareFieldsValidation', () => {
  test('Should return error if comparison is invalid', () => {
    const { sut, fieldName, fieldToCompare } = makeSut()
    const error = sut.validate({ [fieldName]: faker.random.word(), [fieldToCompare]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if comparison is valid', () => {
    const { sut, fieldName, fieldToCompare } = makeSut()
    const valueToCompare = faker.random.word()
    const error = sut.validate({ [fieldName]: valueToCompare, [fieldToCompare]: valueToCompare })
    expect(error).toBeFalsy()
  })
})
