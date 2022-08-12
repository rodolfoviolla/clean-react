import React from 'react'

import { Footer, Header } from '@/presentation/components'

import Styles from './surveyList.styles.scss'

export const SurveyList = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
        </ul>
      </div>
      <Footer />
    </div>
  )
}
