import React, { useContext, useRef } from 'react'

import { FormContext } from '@/presentation/contexts'

import Styles from './styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input = ({ placeholder, ...props }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>()
  const [state, setState] = useContext(FormContext)
  const errorMessage = state[props.name].errorMessage

  return (
    <div className={Styles.inputWrap}>
      <input
        ref={inputRef}
        {...props}
        placeholder=" "
        data-testid={props.name}
        onChange={(event) => setState({ ...state, [event.target.name]: { value: event.target.value } })}
      />

      <label onClick={() => inputRef.current.focus()}>{placeholder}</label>

      <span data-testid={`${props.name}-status`} title={errorMessage || 'Tudo certo'} className={Styles.status}>
        {errorMessage ? '🔴' : '🟢'}
      </span>
    </div>
  )
}
