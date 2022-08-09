import React from 'react'

import { SignUp } from '@/presentation/pages'

import { makeLocalSaveCurrentAccount, makeRemoteAddAccount } from '@/main/factories/useCases'
import { makeSignUpValidation } from './signupValidationFactory'

export const makeSignUp = () => (
  <SignUp
    addAccount={makeRemoteAddAccount()}
    saveCurrentAccount={makeLocalSaveCurrentAccount()}
    validation={makeSignUpValidation()}
  />
)
