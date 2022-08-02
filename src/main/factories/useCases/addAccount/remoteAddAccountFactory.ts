import { RemoteAddAccount } from '@/data/useCases'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteAddAccount = () => new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
