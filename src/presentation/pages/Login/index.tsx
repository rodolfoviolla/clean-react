import React, { useState } from 'react'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { defaultFormContextValue, FormContext, FormContextProps } from '@/presentation/contexts'

import Styles from './styles.scss'

export const Login = () => {
  const [state] = useState<FormContextProps>(defaultFormContextValue)

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={state}>
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
