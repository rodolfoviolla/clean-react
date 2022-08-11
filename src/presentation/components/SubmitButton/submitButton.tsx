import React, { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'

type SubmitButtonProps = {
  text: string
}

export const SubmitButton = ({ text }: SubmitButtonProps) => {
  const [state] = useContext(FormContext)

  return (
    <button data-testid="submit" type="submit" disabled={state.isFormInvalid} >
      {text}
    </button>
  )
}
