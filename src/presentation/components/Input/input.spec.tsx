import React from 'react'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'

import { FormContext } from '@/presentation/contexts'

import { Input } from './input'

const makeSut = () => {
  const fieldName = faker.database.column()

  render(
    <FormContext.Provider value={[null, null]}>
      <Input name={fieldName} />
    </FormContext.Provider>
  )

  return { fieldName }
}

describe('Input Component', () => {
  test('Should focus input on label click', () => {
    const { fieldName } = makeSut()
    const input = screen.getByTestId(fieldName)
    const label = screen.getByTestId(`${fieldName}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
