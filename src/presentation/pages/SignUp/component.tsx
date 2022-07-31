import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

import Styles from './styles.scss'

export const SignUp = () => {
  const state = useState({
    name: {
      errorMessage: 'Campo obrigatório'
    },
    email: {
      errorMessage: 'Campo obrigatório'
    },
    password: {
      errorMessage: 'Campo obrigatório'
    },
    passwordConfirmation: {
      errorMessage: 'Campo obrigatório'
    }
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={state}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />

          <button data-testid="submit" disabled type="submit" className={Styles.submit} >
            Criar
          </button>

          <Link className={Styles.link} to="/login">Voltar para o login</Link>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}
