import React from 'react'

import { makeRemoteAuthentication, makeLocalSaveCurrentAccount } from '@/main/factories/useCases'
import { Login } from '@/presentation/pages'

import { makeLoginValidation } from './loginValidationFactory'

export const makeLogin = () => (
  <Login
    authentication={makeRemoteAuthentication()}
    validation={makeLoginValidation()}
    saveCurrentAccount={makeLocalSaveCurrentAccount()}
  />)
