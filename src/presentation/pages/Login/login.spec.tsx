import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'

import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub, SaveAccessTokenMock } from '@/presentation/test'

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />
    </Router>
  )

  return { sut, authenticationSpy, saveAccessTokenMock }
}

const testErrorWrapChildCount = (sut: RenderResult, count: number) => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, elementTestId: string, isDisabled: boolean) => {
  const button = sut.getByTestId(elementTestId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const populateEmailField = ({ getByTestId }: RenderResult, email = faker.internet.email()) => {
  const emailInput = getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
  return email
}

const populatePasswordField = ({ getByTestId }: RenderResult, password = faker.internet.password()) => {
  const passwordInput = getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
  return password
}

const simulateValidSubmit = async (sut: RenderResult, waitForCallback?: () => void) => {
  const email = populateEmailField(sut)
  const password = populatePasswordField(sut)

  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)

  waitForCallback && await waitFor(waitForCallback)

  return { email, password }
}

const testStatusField = (sut: RenderResult, fieldName: string, validationError?: string) => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testElementExists = (sut: RenderResult, elementTestId: string) => {
  const element = sut.getByTestId(elementTestId)
  expect(element).toBeTruthy()
}

const testElementText = (sut: RenderResult, elementTestId: string, text: string) => {
  const element = sut.getByTestId(elementTestId)
  expect(element.textContent).toBe(text)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    testErrorWrapChildCount(sut, 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusField(sut, 'email', validationError)
    testStatusField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    testStatusField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    testStatusField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    testStatusField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    testStatusField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const { email, password } = await simulateValidSubmit(sut)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut, () => {
      testErrorWrapChildCount(sut, 1)
      testElementText(sut, 'error-message', error.message)
    })
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut, () => {
      expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
      expect(history.index).toBe(0)
      expect(history.location.pathname).toBe('/')
    })
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new Error(faker.random.words())
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut, () => {
      testErrorWrapChildCount(sut, 1)
      testElementText(sut, 'error-message', error.message)
    })
  })

  test('Should go to SignUp page', async () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')
    fireEvent.click(register)
    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
