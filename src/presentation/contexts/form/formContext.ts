import { createContext } from 'react'

type FormContextProps = {
  isLoading: boolean
  errorMessage: string
}

export const FormContext = createContext<FormContextProps>({ isLoading: false, errorMessage: '' })
