import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'

import { PrivateRoute } from './privateRoute'

const history = createMemoryHistory({ initialEntries: ['/'] })

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    render(
      <Router location={history.location} navigator={history}>
        <PrivateRoute />
      </Router>
    )
    expect(history.location.pathname).toBe('/login')
  })
})
