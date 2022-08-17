import { faker } from '@faker-js/faker'

import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy, mockRemoteSurveyModelList } from '@/data/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

import { RemoteLoadSurveyList } from './remoteLoadSurveyList'

const makeSut = () => {
  const url = faker.internet.url()
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return { sut, url, httpGetClientSpy }
}

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const { sut, url, httpGetClientSpy } = makeSut()
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('Should return a RemoteLoadSurveyList.Model list if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyModelList()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual(httpResult.map(model => ({ ...model, date: new Date(model.date) })))
  })

  test('Should return an empty list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual([])
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
