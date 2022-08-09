import React from 'react'

import { Footer, Header, Icon } from '@/presentation/components'

import Styles from './styles.scss'

export const SurveyList = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.icon} iconName='thumbDown' />
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>11</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é seu framework web favorito? Qual é seu framework web favorito? Qual é seu framework web favorito? </p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.icon} iconName='thumbUp' />
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>11</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.icon} iconName='thumbDown' />
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>11</span>
                <span className={Styles.year}>2022</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}
