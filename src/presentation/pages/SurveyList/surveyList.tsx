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
  const [surveyList, setSurveyList] = useState<SurveyModel[]>([])

  useEffect(() => {
    loadSurveyList.loadAll().then(response => setSurveyList(response))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {surveyList.length
            ? surveyList.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
            : <SurveyItemEmpty />
          }
        </ul>
      </div>
      <Footer />
    </div>
  )
}
