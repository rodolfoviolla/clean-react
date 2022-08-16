import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeAuthorizeHttpGetClientDecorator = <ResponseType>() => {
  return new AuthorizeHttpGetClientDecorator<ResponseType>(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
