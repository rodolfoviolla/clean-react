import { HttpResponse } from './httpResponse'

export type HttpPostParams<RequestType> = {
  url: string
  body?: RequestType
}

export interface HttpPostClient<RequestType, ResponseType> {
  post: (params: HttpPostParams<RequestType>) => Promise<HttpResponse<ResponseType>>
}
