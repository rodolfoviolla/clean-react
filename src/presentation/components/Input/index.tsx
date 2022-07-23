import React, { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'

import Styles from './styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input = (props: InputProps) => {
  const [state, setState] = useContext(FormContext)
  const inputName = props?.name ?? ''

  const getStatus = () => {
    return state[inputName].errorMessage ? '🔴' : ''
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} onChange={handleChange} />
      <span data-testid={`${inputName}-status`} title={state[inputName].errorMessage} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}
