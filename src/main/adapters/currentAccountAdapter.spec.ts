import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from './currentAccountAdapter'

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('Should call LocalStorageAdapter.get with correct value', () => {
    const account = mockAccountModel()
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)
    const response = getCurrentAccountAdapter()
    expect(getSpy).toHaveBeenCalledWith('account')
    expect(response).toEqual(account)
  })
})
