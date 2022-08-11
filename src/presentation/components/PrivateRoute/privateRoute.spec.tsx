import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'

import { PrivateRoute } from './privateRoute'

const makeSut = () => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <Router location={history.location} navigator={history}>
      <PrivateRoute />
    </Router>
  )

  return { history }
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/login')
  })
})
