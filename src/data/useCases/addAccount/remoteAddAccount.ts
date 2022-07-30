import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError } from '@/domain/errors'
import { AccountModel } from '@/domain/models/accountModel'
import { AddAccount, AddAccountParams } from '@/domain/useCases/addAccount'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({ url: this.url, body: params })

    switch (response.statusCode) {
      case HttpStatusCode.ok: return response.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
    }
  }
}
