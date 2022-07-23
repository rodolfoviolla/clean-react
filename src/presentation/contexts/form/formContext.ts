import { createContext } from 'react'

type InputValues = { value: string, errorMessage: string }

type FormContextState = {
  isLoading: boolean
  errorMessage: string
  email: InputValues
  password: InputValues
}

type FormContextProps = [
  state: FormContextState,
  setState: (state: FormContextState) => void
]

export const FormContext = createContext<FormContextProps>(null)
