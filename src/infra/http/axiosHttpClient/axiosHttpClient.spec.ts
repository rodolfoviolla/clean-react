import axios from 'axios'
import { faker } from '@faker-js/faker'

import { HttpPostParams } from '@/data/protocols/http'

import { AxiosHttpClient } from './axiosHttpClient'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResponse = {
  status: faker.internet.httpStatusCode(),
  data: JSON.parse(faker.datatype.json())
}
mockedAxios.post.mockResolvedValue(mockedAxiosResponse)

const makeSut = (): AxiosHttpClient<any, any> => {
  return new AxiosHttpClient()
}

const makePostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json())
})

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct values', async () => {
    const request = makePostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct status code and body', async () => {
    const sut = makeSut()
    const httpResponse = await sut.post(makePostRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data
    })
  })
})
