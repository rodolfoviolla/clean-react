import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/httpPostClient'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/httpResponse'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  }

  async post ({ url, body }: HttpPostParams): Promise<HttpResponse> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
