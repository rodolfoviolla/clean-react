import { LocalSaveCurrentAccount } from '@/data/useCases'
import { SaveCurrentAccount } from '@/domain/useCases'
import { makeLocalStorageAdapter } from '@/main/factories/cache'

export const makeLocalSaveCurrentAccount = (): SaveCurrentAccount => new LocalSaveCurrentAccount(makeLocalStorageAdapter())
