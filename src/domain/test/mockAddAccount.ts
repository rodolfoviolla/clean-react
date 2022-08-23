import { faker } from '@faker-js/faker'

import { mockAccountModel } from '@/domain/test'
import { AddAccount } from '@/domain/useCases'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()

  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  params: AddAccount.Params
  callsCount = 0

  async add (params: AddAccount.Params) {
    this.params = params
    this.callsCount++
    return this.account
  }
}
