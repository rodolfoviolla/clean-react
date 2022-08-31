import { HttpGetClient } from '@/data/protocols/http'
import { LoadSurveyResult } from '@/domain/useCases'

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetCliente: HttpGetClient<LoadSurveyResult.Model>
  ) {}

  async load () {
    await this.httpGetCliente.get({ url: this.url })
  }
}
