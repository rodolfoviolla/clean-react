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
      errorMessage: 'Campo obrigatório'
    },
    password: {
      value: '',
      errorMessage: 'Campo obrigatório'
    }
  })

  useEffect(() => {
    validation.validate({ email: state.email })
  }, [state.email])

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
