import axios from 'axios'
import { faker } from '@faker-js/faker'

import { AxiosHttpClient } from './axiosHttpClient'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
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
})
