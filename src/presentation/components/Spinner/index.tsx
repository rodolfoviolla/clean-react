import React from 'react'

import Styles from './styles.scss'

type SpinnerProps = React.HTMLAttributes<HTMLElement>

export const Spinner = (props: SpinnerProps) => {
  return <div {...props} className={[Styles.spinner, props.className].join(' ')}></div>
}
