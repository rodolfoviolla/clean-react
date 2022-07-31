import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols'

import Styles from './styles.scss'

type Props = {
  validation?: Validation
}

export const SignUp = ({ validation }: Props) => {
  const [state, setState] = useState({
    name: {
      value: '',
      errorMessage: ''
    },
    email: {
      value: '',
      errorMessage: ''
    },
    password: {
      value: '',
      errorMessage: ''
    },
    passwordConfirmation: {
      value: '',
      errorMessage: ''
    }
  })

  useEffect(() => {
    setState({
      ...state,
      name: {
        ...state.name,
        errorMessage: validation.validate('name', state.name.value)
      },
      email: {
        ...state.email,
        errorMessage: validation.validate('email', state.email.value)
      },
      password: {
        ...state.password,
        errorMessage: validation.validate('password', state.password.value)
      },
      passwordConfirmation: {
        ...state.passwordConfirmation,
        errorMessage: validation.validate('passwordConfirmation', state.passwordConfirmation.value)
      }
    })
  }, [state.name.value, state.email.value, state.password.value, state.passwordConfirmation.value])

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={[state, setState]}>
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