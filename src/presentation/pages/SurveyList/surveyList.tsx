import React, { useEffect } from 'react'

import { LoadSurveyList } from '@/domain/useCases'
import { Footer, Header } from '@/presentation/components'

import { SurveyItemEmpty } from './components'
import Styles from './surveyList.styles.scss'

type SurveyListProps = {
  loadSurveyList: LoadSurveyList
}

export const SurveyList = ({ loadSurveyList }: SurveyListProps) => {
  useEffect(() => {
    loadSurveyList.loadAll()
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}
