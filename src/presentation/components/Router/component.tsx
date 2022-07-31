import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { SignUp } from '@/presentation/pages'

type Props = {
  makeLogin: () => JSX.Element
}

export const Router = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLogin()} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
