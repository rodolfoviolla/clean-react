import { faker } from '@faker-js/faker'

import { AccountModel } from '@/domain/models'
import { AuthenticationParams, AddAccountParams } from '@/domain/useCases'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
