import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
  element: JSX.Element
}

export const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext)

  const token = getCurrentAccount()?.accessToken

  return token ? element : <Navigate to="/login" />
}
