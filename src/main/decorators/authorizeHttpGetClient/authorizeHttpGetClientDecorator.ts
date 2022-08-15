import { GetStorage } from '@/data/protocols/cache'
import { HttpGetClient, HttpGetParams } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator<ResponseType> implements HttpGetClient<ResponseType> {
  constructor (private readonly getStorage: GetStorage) {}

  async get (params: HttpGetParams) {
    this.getStorage.get('account')
    return null
  }
}
