import { RemoteAddAccount } from '@/data/useCases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteAddAccount = () => new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
