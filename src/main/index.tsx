import React from 'react'
import * as ReactDOMClient from 'react-dom/client'

import '@/presentation/styles/global.scss'

import { Router } from './routes/router'

ReactDOMClient
  .createRoot(document.getElementById('main'))
  .render(<Router />)
