import { FormContext } from '@/presentation/contexts'
import React, { useContext } from 'react'

type Props = {
  text: string
}

export const SubmitButton = ({ text }: Props) => {
  const [state] = useContext(FormContext)

  return (
    <button data-testid="submit" type="submit" disabled={state.isFormInvalid} >
      {text}
    </button>
  )
}
