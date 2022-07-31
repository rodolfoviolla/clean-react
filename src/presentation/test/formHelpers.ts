import { faker } from '@faker-js/faker'
import { fireEvent, RenderResult } from '@testing-library/react'

const fakerFn = {
  name: faker.name.findName,
  email: faker.internet.email,
  password: faker.internet.password,
  passwordConfirmation: faker.internet.password
}

export const testElementChildCount = (sut: RenderResult, fieldName: string, count: number) => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, elementTestId: string, isDisabled: boolean) => {
  const button = sut.getByTestId(elementTestId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusField = (sut: RenderResult, fieldName: string, validationError?: string) => {
  const statusElement = sut.getByTestId(`${fieldName}-status`)
  expect(statusElement.title).toBe(validationError || 'Tudo certo')
  expect(statusElement.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateFormField = ({ getByTestId }: RenderResult, name: string, defaultValue?: any) => {
  const input = getByTestId(name)
  const value = defaultValue || fakerFn[name]()
  fireEvent.input(input, { target: { value } })
  return value
}
