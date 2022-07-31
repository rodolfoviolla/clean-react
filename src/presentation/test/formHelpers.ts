import { RenderResult } from '@testing-library/react'

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
