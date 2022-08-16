import { GetStorage } from '@/data/protocols/cache'
import { HttpGetClient, HttpGetParams } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator<ResponseType> implements HttpGetClient<ResponseType> {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<ResponseType>
  ) {}

  async get (params: HttpGetParams) {
    const account = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(params, {
        headers: { ...(params.headers || {}), 'x-access-token': account.accessToken }
      })
    }

    return await this.httpGetClient.get(params)
  }
}
