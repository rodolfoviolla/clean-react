import React from 'react'

import { SignUp } from '@/presentation/pages'

import { makeLocalSaveAccessToken, makeRemoteAddAccount } from '@/main/factories/useCases'
import { makeSignUpValidation } from './signupValidationFactory'

export const makeSignUp = () => (
  <SignUp
    addAccount={makeRemoteAddAccount()}
    saveAccessToken={makeLocalSaveAccessToken()}
    validation={makeSignUpValidation()}
  />
)
