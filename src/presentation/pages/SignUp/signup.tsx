import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AddAccount } from '@/domain/useCases'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { ApiContext, FormContext } from '@/presentation/contexts'
import { useValidateField } from '@/presentation/hooks'
import { Validation } from '@/presentation/protocols'

import Styles from './signup.styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const initialState = {
  isLoading: false,
  isFormInvalid: true,
  errorMessage: '',
  formData: {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  },
  formErrors: {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }
}

export const SignUp = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const [state, setState] = useState(initialState)

  useValidateField({ field: 'name', formData: state.formData, setState, validation })
  useValidateField({ field: 'email', formData: state.formData, setState, validation })
  useValidateField({ field: 'password', formData: state.formData, setState, validation })
  useValidateField({ field: 'passwordConfirmation', formData: state.formData, setState, validation })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) return

      setState({ ...state, isLoading: true })

      const account = await addAccount.add(state.formData)

      setCurrentAccount(account)

      navigate('/', { replace: true })
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        errorMessage: error.message
      })
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />

      <FormContext.Provider value={[state, setState]}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />

          <SubmitButton text='Cadastrar' />

          <Link data-testid="login" className={Styles.link} replace to="/login">Voltar para o login</Link>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}
