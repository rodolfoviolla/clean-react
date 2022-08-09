import { faker } from '@faker-js/faker'

import { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
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

export const mockGetRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url()
})

export class HttpGetClientSpy<ResponseType> implements HttpGetClient<ResponseType> {
  url: string
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams) {
    this.url = params.url

    return this.response
  }
}
