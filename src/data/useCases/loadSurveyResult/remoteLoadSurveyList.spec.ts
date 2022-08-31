import { faker } from '@faker-js/faker'

import { HttpGetClientSpy } from '@/data/test'
import { LoadSurveyResult } from '@/domain/useCases'

import { RemoteLoadSurveyResult } from './remoteLoadSurveyResult'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError } from '@/domain/errors'

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

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })
})
