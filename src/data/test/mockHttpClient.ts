import { HttpPostClient, HttpPostParams } from 'data/protocols/http/httpPostClient'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object

  async post ({ url, body }: HttpPostParams): Promise<void> {
    this.url = url
    this.body = body
    return await Promise.resolve()
  }
}
