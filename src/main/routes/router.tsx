import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { makeLogin, makeSignUp, makeSurveys } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'

export const Router = () => {
  return (
    <ApiContext.Provider
      value={{ setCurrentAccount: setCurrentAccountAdapter, getCurrentAccount: getCurrentAccountAdapter }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={makeLogin()} />
          <Route path='/signup' element={makeSignUp()} />
          <Route path='/' element={<PrivateRoute element={makeSurveys()} />}
          />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}
