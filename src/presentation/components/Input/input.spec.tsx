import React from 'react'
import { faker } from '@faker-js/faker'
import { fireEvent, render } from '@testing-library/react'

import { Input } from './component'
import { FormContext } from '@/presentation/contexts'

const makeSut = () => {
  const fieldName = faker.database.column()
  const sut = render(
    <FormContext.Provider value={[]}>
      <Input name={fieldName} />
    </FormContext.Provider>
  )

  return { sut, fieldName }
}

describe('Input Component', () => {
  test('Should focus input on label click', () => {
    const { sut, fieldName } = makeSut()
    const input = sut.getByTestId(fieldName)
    const label = sut.getByTestId(`${fieldName}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
