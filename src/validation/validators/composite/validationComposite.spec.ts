import { faker } from '@faker-js/faker'

import { FieldValidationSpy } from '@/validation/test'

import { ValidationComposite } from '.'

type SutTypes = {
  sut: ValidationComposite
  fieldName: string
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldName = faker.database.column()
  const fieldValidationsSpy = [new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)]
  const sut = ValidationComposite.build(fieldValidationsSpy)

  return { sut, fieldValidationsSpy, fieldName }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldName, fieldValidationsSpy } = makeSut()
    const errorMessage = faker.random.words()
    fieldValidationsSpy[1].error = new Error(errorMessage)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  test('Should stop validation if one of them fails', () => {
    const { sut, fieldName, fieldValidationsSpy } = makeSut()
    const firstErrorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(firstErrorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(firstErrorMessage)
  })

  test('Should return error if any validation fails', () => {
    const { sut, fieldName } = makeSut()
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
