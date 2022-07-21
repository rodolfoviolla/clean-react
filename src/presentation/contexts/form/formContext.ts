import { createContext } from 'react'

export type FormContextProps = {
  isLoading: boolean
  errorMessage: string
  email: { errorMessage: string }
  password: { errorMessage: string }
}

export const defaultFormContextValue: FormContextProps = {
  isLoading: false,
  errorMessage: '',
  email: {
    errorMessage: 'Campo obrigatório'
  },
  password: {
    errorMessage: 'Campo obrigatório'
  }
}

export const FormContext = createContext<FormContextProps>(defaultFormContextValue)
