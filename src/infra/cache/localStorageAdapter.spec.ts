import 'jest-localstorage-mock'

import { faker } from '@faker-js/faker'

import { LocalStorageAdapter } from './localStorageAdapter'
import { mockAccountModel } from '@/domain/test'

const makeSut = () => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(localStorage.clear)

  test('Should call localStorage with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = mockAccountModel()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
