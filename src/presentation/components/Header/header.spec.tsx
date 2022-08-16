import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { ApiContext } from '@/presentation/contexts'

import { Header } from './header'

const history = createMemoryHistory({ initialEntries: ['/'] })

describe('Header Component', () => {
  test('Should call setCurrentAccount with falsy value', () => {
    const setCurrentAccountMock = jest.fn()
    render(
      <Router location={history.location} navigator={history}>
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
          <Header />
        </ApiContext.Provider>
      </Router>
    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith()
    expect(history.location.pathname).toBe('/login')
  })
})
