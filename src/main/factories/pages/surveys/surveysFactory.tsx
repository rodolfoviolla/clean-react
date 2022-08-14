import React from 'react'

import { makeRemoteLoadSurveyList } from '@/main/factories/useCases'
import { Surveys } from '@/presentation/pages'

export const makeSurveys = () => (
  <Surveys
    loadSurveyList={makeRemoteLoadSurveyList()}
  />
)
