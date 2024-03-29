import { faker } from '@faker-js/faker'

import { AccountModel } from '@/domain/models'

export const mockAccountModel = (): AccountModel => ({
  name: faker.name.fullName(),
  accessToken: faker.datatype.uuid()
})
