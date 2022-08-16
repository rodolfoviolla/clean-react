import React from 'react'

import { Icon } from '@/presentation/components'

import Styles from './surveyItem.styles.scss'
import { LoadSurveyList } from '@/domain/useCases'

type SurveyItemProps = {
  survey: LoadSurveyList.Model
}

export const SurveyItem = ({ survey }: SurveyItemProps) => {
  const iconName = survey.didAnswer ? 'thumbUp' : 'thumbDown'
  const day = survey.date.getDate().toString().padStart(2, '0')
  const month = survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')
  const year = survey.date.getFullYear()

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.icon} iconName={iconName} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {day}
          </span>
          <span data-testid="month" className={Styles.month}>
            {month}
          </span>
          <span data-testid="year" className={Styles.year}>
            {year}
          </span>
        </time>
        <p data-testid="question">
          {survey.question}
        </p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}
