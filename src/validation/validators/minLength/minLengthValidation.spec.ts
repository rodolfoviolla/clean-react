import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'

import { MinLengthValidation } from './minLengthValidation'

type SutTypes = {
  sut: MinLengthValidation
  fieldName: string
  minLength: number
}

const makeSut = (): SutTypes => {
  const fieldName = faker.database.column()
  const minLength = faker.datatype.number({ min: 2, max: 10 })
  const sut = new MinLengthValidation(fieldName, minLength)

  return { sut, fieldName, minLength }
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const { sut, fieldName, minLength } = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(minLength - 1))
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if value is valid', () => {
    const { sut, minLength } = makeSut()
    let error = sut.validate(faker.random.alphaNumeric(minLength))
    expect(error).toBeFalsy()
    error = sut.validate(faker.random.alphaNumeric(minLength + 1))
    expect(error).toBeFalsy()
  })
})
