import { faker } from '@faker-js/faker'

import { HttpPostParams } from '../protocols/http'

export const makePostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json())
})
