import { AccountModel } from '@/domain/models'
import { makeLocalStorageAdapter } from '@/main/factories/cache'

export const setCurrentAccountAdapter = (account: AccountModel) => {
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = () => {
  return makeLocalStorageAdapter().get('account')
}
