import { FieldValidationSpy } from '@/validation/test/mockFieldValidation'

import { ValidationComposite } from '.'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidationSpyWithSuccess = new FieldValidationSpy('any_field')
    const fieldValidationSpyWithError = new FieldValidationSpy('any_field')
    fieldValidationSpyWithError.error = new Error('any_error_message')
    const sut = new ValidationComposite([fieldValidationSpyWithSuccess, fieldValidationSpyWithError])
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_error_message')
  })

  test('Should stop validation if one of them fails', () => {
    const fieldValidationSpyWithSuccess = new FieldValidationSpy('any_field')
    const fieldValidationSpyWithFirstError = new FieldValidationSpy('any_field')
    const fieldValidationSpyWithSecondError = new FieldValidationSpy('any_field')
    fieldValidationSpyWithFirstError.error = new Error('first_error_message')
    fieldValidationSpyWithSecondError.error = new Error('second_error_message')
    const sut = new ValidationComposite([
      fieldValidationSpyWithSuccess,
      fieldValidationSpyWithFirstError,
      fieldValidationSpyWithSecondError
    ])
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })
})
