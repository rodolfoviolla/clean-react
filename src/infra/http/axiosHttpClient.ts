import axios, { AxiosResponse } from 'axios'

import { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams } from '@/data/protocols/http'

export class AxiosHttpClient<RequestType = any, ResponseType = any>
implements HttpPostClient<RequestType, ResponseType>, HttpGetClient<ResponseType> {
  private readonly adapt = (axiosResponse: AxiosResponse<ResponseType>) => ({
    statusCode: axiosResponse.status, body: axiosResponse.data
  })

  async post (params: HttpPostParams<RequestType>) {
    let axiosResponse: AxiosResponse<ResponseType>

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }

  async get (params: HttpGetParams) {
    let axiosResponse: AxiosResponse<ResponseType>

    try {
      axiosResponse = await axios.get(params.url, { headers: params.headers })
    } catch (error) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }
}
