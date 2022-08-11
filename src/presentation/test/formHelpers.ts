import { faker } from '@faker-js/faker'
import { fireEvent, waitFor, screen } from '@testing-library/react'

const getMockedValues = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password()
})

export const testElementChildCount = (fieldName: string, count: number) => {
  const element = screen.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (elementTestId: string, isDisabled: boolean) => {
  const button: HTMLButtonElement = screen.getByTestId(elementTestId)
  expect(button.disabled).toBe(isDisabled)
}

export const testInputFieldElements = (fieldName: string, validationError: string = '') => {
  const fieldWrap = screen.getByTestId(`${fieldName}-wrap`)
  const fieldElement = screen.getByTestId(fieldName)
  const fieldLabel = screen.getByTestId(`${fieldName}-label`)

  expect(fieldWrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(fieldElement.title).toBe(validationError)
  expect(fieldLabel.title).toBe(validationError)
}

export const populateFormField = (name: string) => {
  const input = screen.getByTestId(name)
  const value = getMockedValues()[name]
  fireEvent.input(input, { target: { value } })
  return value
}

export const simulateValidSubmitFactory = async <T extends string>(
  fieldList: T[],
  waitForCallback?: () => void
) => {
  const populatedFields = fieldList.reduce((acc, field) => {
    const value = populateFormField(field)

    return { ...acc, [field]: value }
  }, {})

  const submitButton = screen.getByTestId('submit')
  fireEvent.click(submitButton)

  waitForCallback && await waitFor(waitForCallback)

  return populatedFields as { [key in T]: unknown }
}

export const testElementExists = (elementTestId: string) => {
  const element = screen.getByTestId(elementTestId)
  expect(element).toBeTruthy()
}

export const testElementText = (elementTestId: string, text: string) => {
  const element = screen.getByTestId(elementTestId)
  expect(element.textContent).toBe(text)
}
