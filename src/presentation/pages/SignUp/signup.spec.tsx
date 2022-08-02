import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'

import { SignUp } from '@/presentation/pages'
import { AddAccountSpy, formHelpers, SaveAccessTokenMock, ValidationStub } from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router location={history.location} navigator={history}>
      <SignUp validation={validationStub} addAccount={addAccountSpy} saveAccessToken={saveAccessTokenMock} />
    </Router>
  )

  return { sut, addAccountSpy, saveAccessTokenMock }
}

const simulateValidSubmit = async (sut: RenderResult, waitForCallback?: () => void) => {
  return await formHelpers.simulateValidSubmitFactory(
    sut,
    ['name', 'email', 'password', 'passwordConfirmation'],
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
    formHelpers.testStatusField(sut, 'name', validationError)
    formHelpers.testStatusField(sut, 'email', validationError)
    formHelpers.testStatusField(sut, 'password', validationError)
    formHelpers.testStatusField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const fieldName = 'name'
    formHelpers.populateFormField(sut, fieldName)
    formHelpers.testStatusField(sut, fieldName, validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const fieldName = 'email'
    formHelpers.populateFormField(sut, fieldName)
    formHelpers.testStatusField(sut, fieldName, validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const fieldName = 'password'
    formHelpers.populateFormField(sut, fieldName)
    formHelpers.testStatusField(sut, fieldName, validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const fieldName = 'passwordConfirmation'
    formHelpers.populateFormField(sut, fieldName)
    formHelpers.testStatusField(sut, fieldName, validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut()
    formHelpers.populateFormField(sut, 'name')
    formHelpers.testStatusField(sut, 'name')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    formHelpers.populateFormField(sut, 'email')
    formHelpers.testStatusField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    formHelpers.populateFormField(sut, 'password')
    formHelpers.testStatusField(sut, 'password')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut()
    formHelpers.populateFormField(sut, 'passwordConfirmation')
    formHelpers.testStatusField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    formHelpers.populateFormField(sut, 'name')
    formHelpers.populateFormField(sut, 'email')
    formHelpers.populateFormField(sut, 'password')
    formHelpers.populateFormField(sut, 'passwordConfirmation')
    formHelpers.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    formHelpers.testElementExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const fields = await simulateValidSubmit(sut)
    expect(addAccountSpy.params).toEqual(fields)
  })

  test('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })
    fireEvent.submit(sut.getByTestId('form'))
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut, () => {
      formHelpers.testElementChildCount(sut, 'error-wrap', 1)
      formHelpers.testElementText(sut, 'error-message', error.message)
    })
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut, () => {
      expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
      expect(history.index).toBe(0)
      expect(history.location.pathname).toBe('/')
    })
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new Error(faker.random.words())
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut, () => {
      formHelpers.testElementChildCount(sut, 'error-wrap', 1)
      formHelpers.testElementText(sut, 'error-message', error.message)
    })
  })

  test('Should go to Login page', async () => {
    const { sut } = makeSut()
    const loginLink = sut.getByTestId('login')
    fireEvent.click(loginLink)
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/login')
  })
})
