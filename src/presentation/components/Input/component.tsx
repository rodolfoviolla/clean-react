import React, { useContext, useRef } from 'react'

import { FormContext } from '@/presentation/contexts'

import Styles from './styles.scss'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input = ({ placeholder, ...props }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>()
  const [state, setState] = useContext(FormContext)
  const errorMessage = state[props.name].errorMessage

  return (
    <div
      data-testid={`${props.name}-wrap`}
      data-status={errorMessage ? 'invalid' : 'valid'}
      className={Styles.inputWrap}
    >
      <input
        data-testid={props.name}
        {...props}
        ref={inputRef}
        title={errorMessage}
        placeholder=" "
        onChange={(event) => setState({ ...state, [event.target.name]: { value: event.target.value } })}
      />

      <label
        data-testid={`${props.name}-label`}
        title={errorMessage}
        onClick={() => inputRef.current.focus()}
      >
        {placeholder}
      </label>
    </div>
  )
}
