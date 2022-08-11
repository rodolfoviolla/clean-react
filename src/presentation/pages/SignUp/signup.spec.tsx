import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'

import { AddAccountSpy, formHelpers, ValidationStub } from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'

import { SignUp } from './signup'

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()

  validationStub.errorMessage = params?.validationError

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return { addAccountSpy, setCurrentAccountMock }
}

const simulateValidSubmit = async (waitForCallback?: () => void) => {
  return await formHelpers.simulateValidSubmitFactory(
    ['name', 'email', 'password', 'passwordConfirmation'],
    waitForCallback
  )
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    formHelpers.testElementChildCount('error-wrap', 0)
    formHelpers.testButtonIsDisabled('submit', true)
    formHelpers.testInputFieldElements('name', validationError)
    formHelpers.testInputFieldElements('email', validationError)
    formHelpers.testInputFieldElements('password', validationError)
    formHelpers.testInputFieldElements('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    const fieldName = 'name'
    formHelpers.populateFormField(fieldName)
    formHelpers.testInputFieldElements(fieldName, validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    const fieldName = 'email'
    formHelpers.populateFormField(fieldName)
    formHelpers.testInputFieldElements(fieldName, validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    const fieldName = 'password'
    formHelpers.populateFormField(fieldName)
    formHelpers.testInputFieldElements(fieldName, validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    const fieldName = 'passwordConfirmation'
    formHelpers.populateFormField(fieldName)
    formHelpers.testInputFieldElements(fieldName, validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    formHelpers.populateFormField('name')
    formHelpers.testInputFieldElements('name')
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    formHelpers.populateFormField('passwordConfirmation')
    formHelpers.testInputFieldElements('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    formHelpers.populateFormField('name')
    formHelpers.populateFormField('email')
    formHelpers.populateFormField('password')
    formHelpers.populateFormField('passwordConfirmation')
    formHelpers.testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    formHelpers.testElementExists('spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const fields = await simulateValidSubmit()
    expect(addAccountSpy.params).toEqual(fields)
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    fireEvent.submit(screen.getByTestId('form'))
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(() => {
      formHelpers.testElementChildCount('error-wrap', 1)
      formHelpers.testElementText('error-message', error.message)
    })
  })

  test('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit(() => {
      expect(setCurrentAccountMock).toHaveBeenLastCalledWith(addAccountSpy.account)
      expect(history.index).toBe(0)
      expect(history.location.pathname).toBe('/')
    })
  })

  test('Should go to Login page', async () => {
    makeSut()
    const loginLink = screen.getByTestId('login')
    fireEvent.click(loginLink)
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/login')
  })
})
