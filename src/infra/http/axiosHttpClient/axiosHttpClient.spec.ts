import { makePostRequest } from '@/data/test'
import { mockAxios, MockAxiosType } from '@/infra/test'

import { AxiosHttpClient } from '.'

jest.mock('axios')

type SutTypes = MockAxiosType & {
  sut: AxiosHttpClient<any, any>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { sut, ...mockedAxios }
}

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct values', async () => {
    const request = makePostRequest()
    const { sut, mockedAxios, resolveMockedAxios } = makeSut()
    resolveMockedAxios()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct status code and body', () => {
    const { sut, mockedAxios, resolveMockedAxios } = makeSut()
    resolveMockedAxios()
    const promise = sut.post(makePostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  test('Should return the correct status code and body on failure', () => {
    const { sut, mockedAxios, rejectMockedAxios } = makeSut()
    rejectMockedAxios()
    const promise = sut.post(makePostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
