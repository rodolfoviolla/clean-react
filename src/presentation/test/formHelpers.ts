import { faker } from '@faker-js/faker'
import { fireEvent, RenderResult, waitFor } from '@testing-library/react'

const getMockedValues = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password()
})

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

export const populateFormField = ({ getByTestId }: RenderResult, name: string) => {
  const input = getByTestId(name)
  const value = getMockedValues()[name]
  fireEvent.input(input, { target: { value } })
  return value
}

export const simulateValidSubmitFactory = async <T extends string>(
  sut: RenderResult,
  fieldList: T[],
  waitForCallback?: () => void
) => {
  const populatedFields = fieldList.reduce((acc, field) => {
    const value = populateFormField(sut, field)

    return { ...acc, [field]: value }
  }, {})

  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)

  waitForCallback && await waitFor(waitForCallback)

  return populatedFields as { [key in T]: unknown }
}

export const testElementExists = (sut: RenderResult, elementTestId: string) => {
  const element = sut.getByTestId(elementTestId)
  expect(element).toBeTruthy()
}
