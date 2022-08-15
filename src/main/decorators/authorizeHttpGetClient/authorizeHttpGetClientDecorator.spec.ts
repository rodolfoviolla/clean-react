import { GetStorageSpy, mockGetRequest } from '@/data/test'

import { AuthorizeHttpGetClientDecorator } from './authorizeHttpGetClientDecorator'

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator<any>(getStorageSpy)
    sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
