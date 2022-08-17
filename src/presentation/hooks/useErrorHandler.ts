import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccessDeniedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'

export const useErrorHandler = (callback: (error: Error) => void) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()

  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount()
      navigate('/login', { replace: true })
      return
    }
    callback(error)
  }
}
