import { makePostRequest } from '@/data/test'
import { MockAxios, mockAxios } from '@/infra/test'

import { AxiosHttpClient } from './axiosHttpClient'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient<any, any>
  mockedAxios: MockAxios
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct values', async () => {
    const request = makePostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct status code and body', () => {
    const { sut, mockedAxios } = makeSut()
    const promise = sut.post(makePostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
