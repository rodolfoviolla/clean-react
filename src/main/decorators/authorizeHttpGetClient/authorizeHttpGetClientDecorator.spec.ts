import { GetStorageSpy, mockGetRequest } from '@/data/test'

import { AuthorizeHttpGetClientDecorator } from './authorizeHttpGetClientDecorator'

const makeSut = () => {
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpGetClientDecorator<any>(getStorageSpy)

  return { sut, getStorageSpy }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', () => {
    const { sut, getStorageSpy } = makeSut()
    sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
