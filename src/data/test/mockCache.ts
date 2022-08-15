import { faker } from '@faker-js/faker'

import { GetStorage } from '@/data/protocols/cache'

export class GetStorageSpy implements GetStorage {
  key: string
  value = JSON.parse(faker.datatype.json())

  get (key: string) {
    this.key = key
    return this.value
  }
}
