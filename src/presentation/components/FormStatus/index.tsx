import React, { useContext } from 'react'

import { Spinner } from '@/presentation/components'

import Styles from './styles.scss'
import { FormContext } from '@/presentation/contexts'

export const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext)

  return (
    <div data-testid="errorWrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}
