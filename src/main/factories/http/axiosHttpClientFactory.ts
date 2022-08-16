import { AxiosHttpClient } from '@/infra/http'

export const makeAxiosHttpClient = <RequestType, ResponseType>() => {
  return new AxiosHttpClient<RequestType, ResponseType>()
}
