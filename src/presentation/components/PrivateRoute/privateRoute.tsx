import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = () => {
  return <Navigate to="/login" />
}
