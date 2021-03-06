import React, { useContext } from 'react'

import { Spinner } from '@/presentation/components'

import Styles from './styles.scss'
import { FormContext } from '@/presentation/contexts'

export const FormStatus = () => {
  const [{ isLoading, errorMessage }] = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner data-testid="spinner" className={Styles.spinner} />}
      {errorMessage && <span data-testid="error-message" className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}
