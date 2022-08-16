import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'

import { InvalidCredentialsError } from '@/domain/errors'
import { AuthenticationSpy } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { ValidationStub, formHelpers } from '@/presentation/test'

import { Login } from './login'

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()

  validationStub.errorMessage = params?.validationError

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return { authenticationSpy, setCurrentAccountMock }
}

const simulateValidSubmit = async (waitForCallback?: () => void) => {
  return await formHelpers.simulateValidSubmitFactory(
    ['email', 'password'],
    waitForCallback
  )
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    formHelpers.testInputFieldElements('email', validationError)
    formHelpers.testInputFieldElements('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    formHelpers.populateFormField('email')
    formHelpers.testInputFieldElements('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    formHelpers.populateFormField('password')
    formHelpers.testInputFieldElements('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    formHelpers.populateFormField('email')
    formHelpers.testInputFieldElements('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    formHelpers.populateFormField('password')
    formHelpers.testInputFieldElements('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    formHelpers.populateFormField('email')
    formHelpers.populateFormField('password')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', () => {
    makeSut()
    simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const { email, password } = await simulateValidSubmit()
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', () => {
    const { authenticationSpy } = makeSut()
    simulateValidSubmit()
    simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit(() => {
      expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
      expect(screen.getByTestId('error-message')).toHaveTextContent(error.message)
    })
  })

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
      expect(history.index).toBe(0)
      expect(history.location.pathname).toBe('/')
    })
  })

  test('Should go to SignUp page', async () => {
    makeSut()
    const signupLink = screen.getByTestId('signup')
    fireEvent.click(signupLink)
    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
