import { HttpPostClient, HttpPostParams } from 'data/protocols/http/httpPostClient'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post ({ url }: HttpPostParams): Promise<void> {
    this.url = url
    return await Promise.resolve()
  }
}
