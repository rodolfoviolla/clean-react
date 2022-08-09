import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'

import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub, SaveCurrentAccountMock, formHelpers } from '@/presentation/test'

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveCurrentAccountMock = new SaveCurrentAccountMock()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} saveCurrentAccount={saveCurrentAccountMock} />
    </Router>
  )

  return { sut, authenticationSpy, saveCurrentAccountMock }
}

const simulateValidSubmit = async (sut: RenderResult, waitForCallback?: () => void) => {
  return await formHelpers.simulateValidSubmitFactory(
    sut,
    ['email', 'password'],
    waitForCallback
  )
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    formHelpers.testElementChildCount(sut, 'error-wrap', 0)
    formHelpers.testButtonIsDisabled(sut, 'submit', true)
    formHelpers.testInputFieldElements(sut, 'email', validationError)
    formHelpers.testInputFieldElements(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    formHelpers.populateFormField(sut, 'email')
    formHelpers.testInputFieldElements(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    formHelpers.populateFormField(sut, 'password')
    formHelpers.testInputFieldElements(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    formHelpers.populateFormField(sut, 'email')
    formHelpers.testInputFieldElements(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    formHelpers.populateFormField(sut, 'password')
    formHelpers.testInputFieldElements(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    formHelpers.populateFormField(sut, 'email')
    formHelpers.populateFormField(sut, 'password')
    formHelpers.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    formHelpers.testElementExists(sut, 'spinner')
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
      formHelpers.testElementChildCount(sut, 'error-wrap', 1)
      formHelpers.testElementText(sut, 'error-message', error.message)
    })
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveCurrentAccountMock } = makeSut()
    await simulateValidSubmit(sut, () => {
      expect(saveCurrentAccountMock.account).toEqual(authenticationSpy.account)
      expect(history.index).toBe(0)
      expect(history.location.pathname).toBe('/')
    })
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveCurrentAccountMock } = makeSut()
    const error = new Error(faker.random.words())
    jest.spyOn(saveCurrentAccountMock, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut, () => {
      formHelpers.testElementChildCount(sut, 'error-wrap', 1)
      formHelpers.testElementText(sut, 'error-message', error.message)
    })
  })

  test('Should go to SignUp page', async () => {
    const { sut } = makeSut()
    const signupLink = sut.getByTestId('signup')
    fireEvent.click(signupLink)
    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
