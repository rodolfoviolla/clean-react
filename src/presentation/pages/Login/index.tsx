import React, { useEffect, useState } from 'react'

import { Authentication } from '@/domain/useCases'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'

import Styles from './styles.scss'

type LoginProps = {
  validation?: Validation
  authentication?: Authentication
}

export const Login = ({ validation, authentication }: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    email: {
      value: '',
      errorMessage: ''
    },
    password: {
      value: '',
      errorMessage: ''
    }
  })

  useEffect(() => {
    setState({
      ...state,
      email: {
        ...state.email,
        errorMessage: validation.validate('email', state.email.value)

      },
      password: {
        ...state.password,
        errorMessage: validation.validate('password', state.password.value)
      }
    })
  }, [state.email.value, state.password.value])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
    authentication.auth({ email: state.email.value, password: state.password.value })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={[state, setState]}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />

          <button
            data-testid="submit"
            disabled={!!state.email.errorMessage || !!state.password.errorMessage}
            type="submit"
            className={Styles.submit}
          >
            Entrar
          </button>

          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}
