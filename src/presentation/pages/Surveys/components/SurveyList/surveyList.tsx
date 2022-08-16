import React, { useContext } from 'react'

import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/Surveys/components'
import { SurveyContext } from '@/presentation/pages/Surveys/context'

import Styles from './surveyList.styles.scss'

export const SurveyList = () => {
  const [state] = useContext(SurveyContext)

  return (
    <ul data-testid="survey-list" className={Styles.surveyListWrap}>
      {state.surveyList.length
        ? state.surveyList.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}
