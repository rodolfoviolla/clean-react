import React, { memo, useContext } from 'react'

import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

import Styles from './header.styles.scss'
import { useLogout } from '@/presentation/hooks/useLogout'

const HeaderComponent = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const logout = useLogout()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={handleClick}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export const Header = memo(HeaderComponent)
