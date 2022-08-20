import { useEffect } from 'react'

import { Validation } from '@/presentation/protocols'
import { FormContextType } from '../contexts'

type UseValidateFieldProps = {
  field: string
  formData: object
  setState: React.Dispatch<React.SetStateAction<FormContextType>>
  validation: Validation
}

export const useValidateField = ({ field, formData, setState, validation }: UseValidateFieldProps) => {
  useEffect(() => {
    const fieldErrorMessage = validation.validate(field, formData)
    setState(currentState => ({
      ...currentState,
      formErrors: {
        ...currentState.formErrors,
        [field]: fieldErrorMessage
      },
      isFormInvalid: !!fieldErrorMessage || Object.keys(formData).some(
        formField => formField !== field && !!currentState.formErrors[formField]
      )
    }))
  }, [formData[field]])
}
