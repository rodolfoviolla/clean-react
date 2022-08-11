import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { makeLogin, makeSignUp } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'

export const Router = () => {
  return (
    <ApiContext.Provider
      value={{ setCurrentAccount: setCurrentAccountAdapter, getCurrentAccount: getCurrentAccountAdapter }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={makeLogin()} />
          <Route path='/signup' element={makeSignUp()} />
          <Route path='/' element={<SurveyList />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}
