import { RemoteAuthentication } from '@/data/useCases'
import { Authentication } from '@/domain/useCases/authentication'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient())
}
