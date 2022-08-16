import { faker } from '@faker-js/faker'

import { AccountModel } from '@/domain/models'

export const mockAccountModel = (): AccountModel => ({
  name: faker.name.findName(),
  accessToken: faker.datatype.uuid()
})
