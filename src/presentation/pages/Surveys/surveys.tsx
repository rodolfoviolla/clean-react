import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccessDeniedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/useCases'
import { Footer, Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

import { SurveyList, Error } from './components'
import { SurveyContext, SurveyContextStateType } from './context'

import Styles from './surveys.styles.scss'

type SurveysProps = {
  loadSurveyList: LoadSurveyList
}

export const Surveys = ({ loadSurveyList }: SurveysProps) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const [state, setState] = useState<SurveyContextStateType>({ surveyList: [], reload: false, error: null })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveyList => setState({ ...state, surveyList }))
      .catch(error => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount()
          navigate('/login', { replace: true })
          return
        }
        setState({ ...state, error })
      })
  }, [state.reload])

  return (
    <div className={Styles.surveysWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={[state, setState]}>
          {state.error ? <Error /> : <SurveyList /> }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}
