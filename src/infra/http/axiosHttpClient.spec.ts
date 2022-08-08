import { makePostRequest } from '@/data/test'
import { AxiosHttpClient } from '@/infra/http'
import { mockAxios } from '@/infra/test'

jest.mock('axios')

const makeSut = () => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { sut, ...mockedAxios }
}

describe('AxiosHttpClient', () => {
  describe('post', () => {
    test('Should call axios post with correct values', async () => {
      const request = makePostRequest()
      const { sut, mockedAxios, resolveMockedAxios } = makeSut()
      resolveMockedAxios()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct axios.post response', () => {
      const { sut, mockedAxios, resolveMockedAxios } = makeSut()
      resolveMockedAxios()
      const promise = sut.post(makePostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('Should return the correct axios.post response on failure', () => {
      const { sut, mockedAxios, rejectMockedAxios } = makeSut()
      rejectMockedAxios()
      const promise = sut.post(makePostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
})
