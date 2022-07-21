import React, { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'

import Styles from './styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input = (props: InputProps) => {
  const context = useContext(FormContext)
  const inputName = props?.name ?? ''

  const getStatus = () => {
    return context[inputName].errorMessage ? '🔴' : ''
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} />
      <span data-testid={`${inputName}-status`} title={context[inputName].errorMessage} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}
