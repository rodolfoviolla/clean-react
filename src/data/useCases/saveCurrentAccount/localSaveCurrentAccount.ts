import { SetStorage } from '@/data/protocols/cache'
import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { SaveCurrentAccount } from '@/domain/useCases'

export class LocalSaveCurrentAccount implements SaveCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}

  async save (account: AccountModel): Promise<void> {
    if (!account) throw new UnexpectedError()

    await this.setStorage.set('account', JSON.stringify(account))
  }
}
