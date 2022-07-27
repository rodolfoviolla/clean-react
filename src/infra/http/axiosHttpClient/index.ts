import axios from 'axios'

import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient<T = any, R = any> implements HttpPostClient<T, R> {
  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    const { status: statusCode, data: body } = await axios.post(params.url, params.body)

    return {
      statusCode,
      body
    }
  }
}
