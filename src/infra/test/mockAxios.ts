import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockAxiosPostResponse = {
  status: faker.internet.httpStatusCode(),
  data: JSON.parse(faker.datatype.json())
}

export const mockAxiosGetResponse = {
  status: faker.internet.httpStatusCode(),
  data: JSON.parse(faker.datatype.json())
}

export const mockAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  const resolveMockedAxiosPost = () => mockedAxios.post.mockResolvedValueOnce(mockAxiosPostResponse)
  const rejectMockedAxiosPost = () => mockedAxios.post.mockRejectedValueOnce({ response: mockAxiosPostResponse })

  const resolveMockedAxiosGet = () => mockedAxios.get.mockResolvedValueOnce(mockAxiosGetResponse)
  const rejectMockedAxiosGet = () => mockedAxios.get.mockRejectedValueOnce({ response: mockAxiosGetResponse })

  return { mockedAxios, resolveMockedAxiosPost, rejectMockedAxiosPost, resolveMockedAxiosGet, rejectMockedAxiosGet }
}
