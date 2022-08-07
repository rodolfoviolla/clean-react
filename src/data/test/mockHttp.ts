import { faker } from '@faker-js/faker'

import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export const makePostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json())
})

export class HttpPostClientSpy<RequestType, ResponseType> implements HttpPostClient<RequestType, ResponseType> {
  url?: string
  body?: RequestType
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async post ({ url, body }: HttpPostParams<RequestType>): Promise<HttpResponse<ResponseType>> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
