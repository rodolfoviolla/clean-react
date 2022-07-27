import { faker } from '@faker-js/faker'

import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'

import { ValidationBuilder } from '.'

type SutTypes = {
  sut: ValidationBuilder
  fieldName: string
  minLength: number
}

const makeSut = (): SutTypes => {
  const fieldName = faker.database.column()
  const minLength = faker.datatype.number({ min: 2, max: 10 })
  const sut = ValidationBuilder.field(fieldName)

  return { sut, fieldName, minLength }
}

describe('ValidatorBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const { sut, fieldName } = makeSut()
    const validations = sut.required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })

  test('Should return EmailValidation', () => {
    const { sut, fieldName } = makeSut()
    const validations = sut.email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })

  test('Should return MinLengthValidation', () => {
    const { sut, fieldName, minLength } = makeSut()
    const validations = sut.min(minLength).build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, minLength)])
  })

  test('Should return a list of validations', () => {
    const { sut, fieldName, minLength } = makeSut()
    const validations = sut.required().min(minLength).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, minLength),
      new EmailValidation(fieldName)
    ])
  })
})
