import React from 'react'

import { SurveyModel } from '@/domain/models'
import { Icon } from '@/presentation/components'

import Styles from './surveyItem.styles.scss'

type SurveyItemProps = {
  survey: SurveyModel
}

export const SurveyItem = ({ survey }: SurveyItemProps) => {
  const iconName = survey.didAnswer ? 'thumbUp' : 'thumbDown'

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.icon} iconName={iconName} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate().toString().padStart(2, '0')}
          </span>
          <span data-testid="month" className={Styles.month}>
            {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid="year" className={Styles.year}>
            {survey.date.getFullYear()}
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
