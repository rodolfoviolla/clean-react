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
})
