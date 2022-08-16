import 'jest-localstorage-mock'
import { faker } from '@faker-js/faker'

import { mockAccountModel } from '@/domain/test'

import { LocalStorageAdapter } from './localStorageAdapter'

const makeSut = () => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(localStorage.clear)

  test('Should call localStorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = mockAccountModel()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should call localStorage.removeItem if value is falsy', () => {
    const sut = makeSut()
    const key = faker.database.column()
    sut.set(key, undefined)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })

  test('Should call localStorage.getItem with correct value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = mockAccountModel()
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const response = sut.get(key)
    expect(response).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
