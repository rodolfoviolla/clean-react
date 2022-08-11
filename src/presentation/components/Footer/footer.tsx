import React, { memo } from 'react'

import Styles from './footer.styles.scss'

const FooterComponent = () => {
  return (
    <footer className={Styles.footer} />
  )
}

export const Footer = memo(FooterComponent)
