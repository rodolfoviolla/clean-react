import { createContext } from 'react'

type FieldType = { [field: string]: string }

export type FormContextType = {
  isLoading: boolean
  isFormInvalid: boolean
  errorMessage: string
  formData: FieldType
  formErrors: FieldType
}

export const FormContext = createContext<[FormContextType, React.Dispatch<React.SetStateAction<FormContextType>>]>(null)
