import axios, { AxiosResponse } from 'axios'

import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient<RequestType = any, ResponseType = any> implements HttpPostClient<RequestType, ResponseType> {
  async post (params: HttpPostParams<RequestType>): Promise<HttpResponse<ResponseType>> {
    let httpResponse: AxiosResponse<ResponseType>
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      httpResponse = error.response
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
