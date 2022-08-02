import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AddAccount, SaveAccessToken } from '@/domain/useCases'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols'

import Styles from './styles.scss'

type Props = {
  validation?: Validation
  addAccount?: AddAccount
  saveAccessToken?: SaveAccessToken
}

export const SignUp = ({ validation, addAccount, saveAccessToken }: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (
        state.isLoading ||
      state.name.errorMessage ||
      state.email.errorMessage ||
      state.password.errorMessage ||
      state.passwordConfirmation.errorMessage
      ) {
        return
      }

      setState({ ...state, isLoading: true })

      const { accessToken } = await addAccount.add({
        name: state.name.value,
        email: state.email.value,
        password: state.password.value,
        passwordConfirmation: state.passwordConfirmation.value
      })

      await saveAccessToken.save(accessToken)
      navigate('/', { replace: true })
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        errorMessage: error.message
      })
    }
  }

  const isButtonDisabled =
    !!state.name.errorMessage ||
    !!state.email.errorMessage ||
    !!state.password.errorMessage ||
    !!state.passwordConfirmation.errorMessage

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={[state, setState]}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />

          <button data-testid="submit" type="submit" className={Styles.submit} disabled={isButtonDisabled} >
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
