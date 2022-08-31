import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/useCases'

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetCliente: HttpGetClient<LoadSurveyResult.Model>
  ) {}

  async load () {
    const httpResponse = await this.httpGetCliente.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: break
    }
  }
}
