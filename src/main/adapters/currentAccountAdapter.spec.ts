import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache'

import { setCurrentAccountAdapter } from './currentAccountAdapter'

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })
})
