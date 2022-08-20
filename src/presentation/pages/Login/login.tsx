import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Authentication } from '@/domain/useCases'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { ApiContext, FormContext } from '@/presentation/contexts'
import { useValidateField } from '@/presentation/hooks'
import { Validation } from '@/presentation/protocols'

import Styles from './login.styles.scss'

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

const initialState = {
  isLoading: false,
  isFormInvalid: true,
  errorMessage: '',
  formErrors: {
    email: '',
    password: ''
  },
  formData: {
    email: '',
    password: ''
  }
}

export const Login = ({ validation, authentication }: LoginProps) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const [state, setState] = useState(initialState)

  useValidateField({ field: 'email', formData: state.formData, setState, validation })
  useValidateField({ field: 'password', formData: state.formData, setState, validation })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) return

      setState({ ...state, isLoading: true })

      const account = await authentication.auth(state.formData)

      setCurrentAccount(account)

      navigate('/', { replace: true })
    } catch (error) {
      setState({ ...state, isLoading: false, errorMessage: error.message })
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />

      <FormContext.Provider value={[state, setState]}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />

          <SubmitButton text='Entrar' />

          <Link data-testid="signup" className={Styles.link} to="/signup">Criar conta</Link>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}
