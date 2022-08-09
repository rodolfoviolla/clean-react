import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Props = {
  makeLogin: () => JSX.Element
  makeSignUp: () => JSX.Element
}

export const Router = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={props.makeLogin()} />
        <Route path='/signup' element={props.makeSignUp()} />
        <Route path='/' element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  )
}
