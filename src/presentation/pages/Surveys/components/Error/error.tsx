import React, { useContext } from 'react'

import { SurveyContext } from '../../context'

import Styles from './error.styles.scss'

export const Error = () => {
  const [state, setState] = useContext(SurveyContext)

  const retry = () => {
    setState({ surveyList: [], reload: !state.reload })
  }

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error-message">{state.error.message}</span>
      <button data-testid="retry" onClick={retry}>Tentar novamente</button>
    </div>
  )
}
