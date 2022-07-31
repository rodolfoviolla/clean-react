import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'

import { SignUp } from '@/presentation/pages'
import { formHelpers } from '@/presentation/test'

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = () => {
  const sut = render(
    <Router location={history.location} navigator={history}>
      <SignUp />
    </Router>
  )

  return { sut }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    formHelpers.testElementChildCount(sut, 'error-wrap', 0)
    formHelpers.testButtonIsDisabled(sut, 'submit', true)
    formHelpers.testStatusField(sut, 'name', validationError)
    formHelpers.testStatusField(sut, 'email', validationError)
    formHelpers.testStatusField(sut, 'password', validationError)
    formHelpers.testStatusField(sut, 'passwordConfirmation', validationError)
  })
})
