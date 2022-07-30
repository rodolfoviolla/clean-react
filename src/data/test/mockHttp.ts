import { faker } from '@faker-js/faker'

import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export const makePostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json())
})

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post ({ url, body }: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
