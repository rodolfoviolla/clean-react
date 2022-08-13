import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

import { SurveyItem } from './surveyItem'

const makeSut = (survey = mockSurveyModel()) => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel(new Date('2022-01-10T00:00:00'), true)
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent(/^10$/)
    expect(screen.getByTestId('month')).toHaveTextContent(/^jan$/)
    expect(screen.getByTestId('year')).toHaveTextContent(/2022/)
  })
})
