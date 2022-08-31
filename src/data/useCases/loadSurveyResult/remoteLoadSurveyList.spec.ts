import { faker } from '@faker-js/faker'

import { HttpGetClientSpy } from '@/data/test'
import { LoadSurveyResult } from '@/domain/useCases'

import { RemoteLoadSurveyResult } from './remoteLoadSurveyResult'

const makeSut = () => {
  const url = faker.internet.url()
  const httpGetClientSpy = new HttpGetClientSpy<LoadSurveyResult.Model>()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)

  return { sut, url, httpGetClientSpy }
}

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetCliente with correct URL', async () => {
    const { sut, httpGetClientSpy, url } = makeSut()
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
