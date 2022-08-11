import React, { memo } from 'react'

import { Logo } from '@/presentation/components'

import Styles from './loginHeader.styles.scss'

const LoginHeaderComponent = () => {
  return (
    <header className={Styles.headerWrap}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  )
}

export const LoginHeader = memo(LoginHeaderComponent)
