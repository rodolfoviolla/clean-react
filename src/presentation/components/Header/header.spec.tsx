import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { mockAccountModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'

import { Header } from './header'

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = () => {
  const setCurrentAccountMock = jest.fn()
  const account = mockAccountModel()
  render(
    <Router location={history.location} navigator={history}>
      <ApiContext.Provider
        value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}
      >
        <Header />
      </ApiContext.Provider>
    </Router>
  )

  return { setCurrentAccountMock, account }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with falsy value', () => {
    const { setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith()
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render user name correctly', () => {
    const { account } = makeSut()
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
