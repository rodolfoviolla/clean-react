import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { UnexpectedError } from '@/domain/errors'
import { LoadSurveyListSpy } from '@/domain/test'

import { Surveys } from './surveys'

const makeSut = (surveyListLength = 3, loadSurveyListSpy = new LoadSurveyListSpy(surveyListLength)) => {
  render(<Surveys loadSurveyList={loadSurveyListSpy} />)

  return { loadSurveyListSpy, surveyListLength }
}

describe('Surveys component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
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
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })
  })

  test('Should render error on failure', async () => {
    const surveyListLength = 3
    const loadSurveyListSpy = new LoadSurveyListSpy(surveyListLength)
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(surveyListLength, loadSurveyListSpy)
    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
      expect(screen.getByTestId('error-message')).toHaveTextContent(error.message)
    })
  })

  test('Should call LoadSurveyList on reload', async () => {
    const surveyListLength = 3
    const loadSurveyListSpy = new LoadSurveyListSpy(surveyListLength)
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(surveyListLength, loadSurveyListSpy)
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('retry'))
    })
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
