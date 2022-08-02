import { AxiosHttpClient } from '@/infra/http'

export const makeAxiosHttpClient = <T, R>() => {
  return new AxiosHttpClient<T, R>()
}
