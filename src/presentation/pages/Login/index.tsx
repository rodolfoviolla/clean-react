import React, { useEffect, useState } from 'react'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'

import Styles from './styles.scss'

type LoginProps = {
  validation?: Validation
}

export const Login = ({ validation }: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    email: {
      value: '',
      errorMessage: ''
    },
    password: {
      value: '',
      errorMessage: 'Campo obrigatório'
    }
  })

  useEffect(() => {
    setState({
      ...state,
      email: {
        ...state.email,
        errorMessage: validation.validate('email', state.email.value)
      }
    })
  }, [state.email.value])

  useEffect(() => {
    validation.validate('password', state.password.value)
  }, [state.password.value])

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={[state, setState]}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />

          <button data-testid="submit" disabled type="submit" className={Styles.submit}>Entrar</button>

          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}
