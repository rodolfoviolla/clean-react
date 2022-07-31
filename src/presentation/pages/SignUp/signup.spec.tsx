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
    formHelpers.testStatusField(sut, 'email', 'Campo obrigatório')
    formHelpers.testStatusField(sut, 'password', 'Campo obrigatório')
    formHelpers.testStatusField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const fieldName = 'name'
    formHelpers.populateFormField(sut, fieldName)
    formHelpers.testStatusField(sut, fieldName, validationError)
  })
})
