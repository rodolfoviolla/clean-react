import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { SurveyList } from '@/presentation/pages'

import { makeLogin, makeSignUp } from '@/main/factories/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLogin()} />
        <Route path='/signup' element={makeSignUp()} />
        <Route path='/' element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  )
}
