import React from 'react'

import { RemoteAuthentication } from '@/data/useCases/authentication'
import { AccountModel } from '@/domain/models'
import { AuthenticationParams } from '@/domain/useCases/authentication'
import { AxiosHttpClient } from '@/infra/http/axiosHttpClient'
import { Login } from '@/presentation/pages/Login'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeLogin = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient<AuthenticationParams, AccountModel>()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validateComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return <Login authentication={remoteAuthentication} validation={validateComposite} />
}
