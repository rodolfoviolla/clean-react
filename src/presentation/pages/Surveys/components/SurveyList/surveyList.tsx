import React, { useContext } from 'react'

import { SurveyModel } from '@/domain/models'

import { SurveyContext } from '../../context'
import { SurveyItem, SurveyItemEmpty } from '..'

import Styles from './surveyList.styles.scss'

export const SurveyList = () => {
  const [state] = useContext(SurveyContext)

  return (
    <ul data-testid="survey-list" className={Styles.surveyListWrap}>
      {state?.surveyList.length
        ? state.surveyList.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}
