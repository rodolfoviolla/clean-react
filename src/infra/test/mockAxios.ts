import axios from 'axios'
import { faker } from '@faker-js/faker'

type MockAxios = jest.Mocked<typeof axios>

export type MockAxiosType = {
  mockedAxios: MockAxios
  resolveMockedAxios: () => any
  rejectMockedAxios: () => any
}

export const mockAxiosResponse = {
  status: faker.internet.httpStatusCode(),
  data: JSON.parse(faker.datatype.json())
}

export const mockAxios = (): MockAxiosType => {
  const mockedAxios = axios as MockAxios

  const resolveMockedAxios = () => mockedAxios.post.mockResolvedValueOnce(mockAxiosResponse)

  const rejectMockedAxios = () => mockedAxios.post.mockRejectedValueOnce({ response: mockAxiosResponse })

  return { mockedAxios, resolveMockedAxios, rejectMockedAxios }
}
