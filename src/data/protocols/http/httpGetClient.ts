import { HttpResponse } from './httpResponse'

export type HttpGetParams = {
  url: string
  headers?: any
}

export interface HttpGetClient<ResponseType> {
  get: (params: HttpGetParams) => Promise<HttpResponse<ResponseType>>
}
