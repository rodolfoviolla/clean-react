import { LocalSaveAccessToken } from '@/data/useCases'
import { SaveAccessToken } from '@/domain/useCases/saveAccessToken'
import { makeLocalStorageAdapter } from '@/main/factories/cache/localStorageAdapterFactory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => new LocalSaveAccessToken(makeLocalStorageAdapter())
