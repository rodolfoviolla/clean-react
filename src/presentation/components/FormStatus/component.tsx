import React, { useContext } from 'react'

import { Spinner } from '@/presentation/components'

import Styles from './styles.scss'
import { FormContext } from '@/presentation/contexts'

export const FormStatus = () => {
  const [state] = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state?.isLoading && <Spinner data-testid="spinner" className={Styles.spinner} />}
      {state?.errorMessage && <span data-testid="error-message" className={Styles.error}>{state.errorMessage}</span>}
    </div>
  )
}
