import React from 'react'

import { SignUp } from '@/presentation/pages'

import { makeRemoteAddAccount } from '@/main/factories/useCases'
import { makeSignUpValidation } from './signupValidationFactory'

export const makeSignUp = () => (
  <SignUp
    addAccount={makeRemoteAddAccount()}
    validation={makeSignUpValidation()}
  />
)
