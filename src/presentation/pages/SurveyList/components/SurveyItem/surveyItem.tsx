import React from 'react'

import { Icon } from '@/presentation/components'

import Styles from './surveyItem.styles.scss'

export const SurveyItem = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.icon} iconName='thumbDown' />
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>11</span>
          <span className={Styles.year}>2022</span>
        </time>
        <p>
          Qual é seu framework web favorito?
        </p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}
