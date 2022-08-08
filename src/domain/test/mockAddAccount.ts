import { faker } from '@faker-js/faker'

import { AddAccountParams } from '@/domain/useCases'

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
