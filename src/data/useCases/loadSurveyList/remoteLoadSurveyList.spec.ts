import { faker } from '@faker-js/faker'

import { HttpGetClientSpy } from '@/data/test'

import { RemoteLoadSurveyList } from './remoteLoadSurveyList'

const makeSut = () => {
  const url = faker.internet.url()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return { sut, url, httpGetClientSpy }
}

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const { sut, url, httpGetClientSpy } = makeSut()
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
