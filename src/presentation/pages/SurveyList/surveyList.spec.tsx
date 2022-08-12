import React from 'react'
import { render, screen } from '@testing-library/react'

import { LoadSurveyList } from '@/domain/useCases'

import { SurveyList } from './surveyList'

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0

  async loadAll () {
    this.callsCount++
    return []
  }
}

const makeSut = () => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return { loadSurveyListSpy }
}

describe('SurveyList component', () => {
  test('Should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  test('Should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
