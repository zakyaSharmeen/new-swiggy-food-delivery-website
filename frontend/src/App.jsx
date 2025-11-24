import React from 'react'
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
// export const serverURL = "http://localhost:8000";


function App() {
  return (

  

   <Routes>

  
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
    </Routes>
  )
}

export default App