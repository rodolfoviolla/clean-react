import React, { useEffect, useState } from 'react'

import { LoadSurveyList } from '@/domain/useCases'
import { Footer, Header } from '@/presentation/components'

import { SurveyList, Error } from './components'
import { SurveyContext, SurveyContextStateType } from './context'

import Styles from './surveys.styles.scss'

type SurveysProps = {
  loadSurveyList?: LoadSurveyList
}

export const Surveys = ({ loadSurveyList }: SurveysProps) => {
  const [state, setState] = useState<SurveyContextStateType>()

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveyList) => setState({ surveyList }))
      .catch((error) => setState({ error }))
  }, [state?.reload])

  return (
    <div className={Styles.surveysWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={[state, setState]}>
          {state?.error ? <Error /> : <SurveyList /> }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}
