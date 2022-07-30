import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models/accountModel'
import { AddAccount, AddAccountParams } from '@/domain/useCases/addAccount'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({ url: this.url, body: params })

    return response.statusCode === HttpStatusCode.ok ? response.body : null
  }
}
