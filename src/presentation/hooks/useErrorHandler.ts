import { AccessDeniedError } from '@/domain/errors'
import { useLogout } from '@/presentation/hooks'

export const useErrorHandler = (callback: (error: Error) => void) => {
  const logout = useLogout()

  return (error: Error) => {
    if (error instanceof AccessDeniedError) return logout()

    callback(error)
  }
}
