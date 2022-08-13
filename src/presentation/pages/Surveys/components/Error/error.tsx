import React, { useContext } from 'react'

import { SurveyContext } from '../../context'

import Styles from './error.styles.scss'

export const Error = () => {
  const [state] = useContext(SurveyContext)

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error-message">{state.error.message}</span>
      <button>Recarregar</button>
    </div>
  )
}
