import { mockGetRequest, mockPostRequest } from '@/data/test'
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
    test('Should call axios.post with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios, resolveMockedAxiosPost } = makeSut()
      resolveMockedAxiosPost()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct axios.post response', () => {
      const { sut, mockedAxios, resolveMockedAxiosPost } = makeSut()
      resolveMockedAxiosPost()
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('Should return the correct axios.post response on failure', () => {
      const { sut, mockedAxios, rejectMockedAxiosPost } = makeSut()
      rejectMockedAxiosPost()
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })

  describe('get', () => {
    test('Should call axios.get with correct values', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios, resolveMockedAxiosGet } = makeSut()
      resolveMockedAxiosGet()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })
  })
})
