import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Props = {
  makeLogin: () => JSX.Element
}

export const Router = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLogin()} />
      </Routes>
    </BrowserRouter>
  )
}
