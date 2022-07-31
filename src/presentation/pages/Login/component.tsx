import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Authentication, SaveAccessToken } from '@/domain/useCases'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols'

import Styles from './styles.scss'

type LoginProps = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

export const Login = ({ validation, authentication, saveAccessToken }: LoginProps) => {
  const navigate = useNavigate()
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (state.isLoading || state.email.errorMessage || state.password.errorMessage) return

      setState({ ...state, isLoading: true })

      const account = await authentication.auth({ email: state.email.value, password: state.password.value })
      await saveAccessToken.save(account.accessToken)
      navigate('/', { replace: true })
    } catch (error) {
      setState({ ...state, isLoading: false, errorMessage: error.message })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={[state, setState]}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
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

          <Link data-testid="signup" className={Styles.link} to="/signup">Criar conta</Link>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}
