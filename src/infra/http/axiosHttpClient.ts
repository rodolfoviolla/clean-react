import axios, { AxiosResponse } from 'axios'

import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient<RequestType = any, ResponseType = any> implements HttpPostClient<RequestType, ResponseType> {
  async post (params: HttpPostParams<RequestType>): Promise<HttpResponse<ResponseType>> {
    let axiosResponse: AxiosResponse<ResponseType>

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
