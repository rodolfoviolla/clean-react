import axios from 'axios'
import { faker } from '@faker-js/faker'

export type MockAxios = jest.Mocked<typeof axios>

export const mockAxios = (): MockAxios => {
  const mockedAxios = axios as MockAxios
  mockedAxios.post.mockResolvedValue({
    status: faker.internet.httpStatusCode(),
    data: JSON.parse(faker.datatype.json())
  })

  return mockedAxios
}
