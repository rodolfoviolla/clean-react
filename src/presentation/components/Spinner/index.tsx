import React from 'react'
import PropTypes from 'prop-types'

import Styles from './styles.scss'

type SpinnerProps = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
  return <div {...props} className={[Styles.spinner, props.className].join(' ')}></div>
}

Spinner.propTypes = {
  className: PropTypes.string
}

export default Spinner
