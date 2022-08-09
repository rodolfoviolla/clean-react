import axios, { AxiosResponse } from 'axios'

import { HttpGetParams, HttpPostClient, HttpPostParams } from '@/data/protocols/http'

export class AxiosHttpClient<RequestType = any, ResponseType = any> implements HttpPostClient<RequestType, ResponseType> {
  async post (params: HttpPostParams<RequestType>) {
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

  async get (params: HttpGetParams) {
    await axios.get(params.url)
  }
}
