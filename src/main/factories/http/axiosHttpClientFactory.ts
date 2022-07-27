import { AxiosHttpClient } from '@/infra/http'

export const makeAxiosHttpClient = () => {
  return new AxiosHttpClient()
}
