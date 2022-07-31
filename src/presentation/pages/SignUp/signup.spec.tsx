import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import { cleanup, render } from '@testing-library/react'

import { SignUp } from '@/presentation/pages'
import { formHelpers, ValidationStub } from '@/presentation/test'

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router location={history.location} navigator={history}>
      <SignUp validation={validationStub} />
    </Router>
  )

  return { sut }
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
})
