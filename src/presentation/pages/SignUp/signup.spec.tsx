import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult } from '@testing-library/react'

import { SignUp } from '@/presentation/pages'

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = () => {
  const sut = render(
    <Router location={history.location} navigator={history}>
      <SignUp />
    </Router>
  )

  return { sut }
}

const testElementChildCount = (sut: RenderResult, fieldName: string, count: number) => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, elementTestId: string, isDisabled: boolean) => {
  const button = sut.getByTestId(elementTestId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testStatusField = (sut: RenderResult, fieldName: string, validationError?: string) => {
  const statusElement = sut.getByTestId(`${fieldName}-status`)
  expect(statusElement.title).toBe(validationError || 'Tudo certo')
  expect(statusElement.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    testElementChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusField(sut, 'name', validationError)
    testStatusField(sut, 'email', validationError)
    testStatusField(sut, 'password', validationError)
    testStatusField(sut, 'passwordConfirmation', validationError)
  })
})
