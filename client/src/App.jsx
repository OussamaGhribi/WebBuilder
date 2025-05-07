import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import StartPage from './pages/StartPage'
import DragDrop from './pages/DragDrop'
import Prompt from './pages/Prompt'
import Editor from './pages/Editor'; 

import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path="/get-started" element={<StartPage />} />
        <Route path="/drag-drop" element={<DragDrop />} />
        <Route path="/prompt-method" element={<Prompt />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </div>
  )
}

export default App