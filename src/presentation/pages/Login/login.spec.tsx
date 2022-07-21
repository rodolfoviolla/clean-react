import React from 'react'
import { render } from '@testing-library/react'

import { Login } from '.'

describe('Login Component', () => {
  test('Should not render Spinner and error on start', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('errorWrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
