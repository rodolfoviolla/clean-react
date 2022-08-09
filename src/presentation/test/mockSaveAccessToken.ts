import { AccountModel } from '@/domain/models'
import { SaveCurrentAccount } from '@/domain/useCases'

export class SaveCurrentAccountMock implements SaveCurrentAccount {
  account: AccountModel

  async save (account: AccountModel): Promise<void> {
    this.account = account
  }
}
