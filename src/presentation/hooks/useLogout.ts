import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'

export const useLogout = () => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()

  return () => {
    setCurrentAccount()
    navigate('/login', { replace: true })
  }
}
