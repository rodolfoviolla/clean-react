import { faker } from '@faker-js/faker'

import { mockAccountModel } from '@/domain/test'
import { Authentication } from '@/domain/useCases'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel()
  params: Authentication.Params
  callsCount = 0

  async auth (params: Authentication.Params) {
    this.params = params
    this.callsCount++
    return this.account
  }
}
