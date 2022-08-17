import React, { memo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

import Styles from './header.styles.scss'

const HeaderComponent = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    setCurrentAccount()
    navigate('/login', { replace: true })
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={logout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export const Header = memo(HeaderComponent)
