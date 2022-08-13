import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { SurveyModel } from '@/domain/models'
import { mockSurveyModelList } from '@/domain/test'
import { LoadSurveyList } from '@/domain/useCases'

import { SurveyList } from './surveyList'

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveyList: SurveyModel[]

  constructor (private readonly length: number) {
    this.surveyList = mockSurveyModelList(this.length)
  }

  async loadAll () {
    this.callsCount++
    return this.surveyList
  }
}

const makeSut = (surveyListLength = 3) => {
  const loadSurveyListSpy = new LoadSurveyListSpy(surveyListLength)
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return { loadSurveyListSpy, surveyListLength }
}

describe('SurveyList component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    })
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    await waitFor(() => {
      expect(loadSurveyListSpy.callsCount).toBe(1)
    })
  })

  test('Should render SurveyItem on success', async () => {
    const { surveyListLength } = makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(surveyListLength)
    })
  })
})
