import 'jest-localstorage-mock'

import { faker } from '@faker-js/faker'

import { LocalStorageAdapter } from './localStorageAdapter'

const makeSut = () => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(localStorage.clear)

  test('Should call localStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
