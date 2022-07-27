import { RequiredFieldValidation } from '@/validation/validators'

import { ValidationBuilder as sut } from '.'

describe('ValidatorBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
