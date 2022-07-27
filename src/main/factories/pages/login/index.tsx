import React from 'react'

import { makeRemoteAuthentication } from '@/main/factories/useCases'
import { Login } from '@/presentation/pages/Login'

import { makeLoginValidation } from './loginValidationFactory'

export const makeLogin = () => <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />
