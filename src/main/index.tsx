import React from 'react'
import ReactDOM from 'react-dom'

import '@/presentation/styles/global.scss'

import { makeLogin, makeSignUp } from '@/main/factories/pages'
import { Router } from '@/presentation/components'

ReactDOM.render(
  <Router makeLogin={makeLogin} makeSignUp={makeSignUp} />,
  document.getElementById('main')
)
