import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'

import { Surveys } from './surveys'

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (surveyListLength = 3, loadSurveyListSpy = new LoadSurveyListSpy(surveyListLength)) => {
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: mockAccountModel }}>
      <Router location={history.location} navigator={history}>
        <Surveys loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return { loadSurveyListSpy, surveyListLength, setCurrentAccountMock }
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

  test('Should render error on UnexpectedError', async () => {
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

  test('Should logout on AccessDeniedError', async () => {
    const surveyListLength = 3
    const loadSurveyListSpy = new LoadSurveyListSpy(surveyListLength)
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock } = makeSut(surveyListLength, loadSurveyListSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith()
      expect(history.location.pathname).toBe('/login')
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
