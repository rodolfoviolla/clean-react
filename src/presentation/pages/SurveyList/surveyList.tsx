import React, { useEffect, useState } from 'react'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/useCases'
import { Footer, Header } from '@/presentation/components'

import { SurveyItem, SurveyItemEmpty } from './components'
import Styles from './surveyList.styles.scss'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export const SurveyList = ({ loadSurveyList }: SurveyListProps) => {
  const [state, setState] = useState<{ surveyList: SurveyModel[], error?: Error }>({ surveyList: [] })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveyList) => setState({ surveyList }))
      .catch((error) => setState({ surveyList: [], error }))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state?.error
          ? (
              <div>
                <span data-testid="error-message">{state.error.message}</span>
                <button>Recarregar</button>
              </div>
            )
          : (
              <ul data-testid="survey-list">
                {state.surveyList.length
                  ? state.surveyList.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
                  : <SurveyItemEmpty />
                }
              </ul>
            )}
      </div>
      <Footer />
    </div>
  )
}
