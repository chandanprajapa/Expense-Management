import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard';


const App = () => {

  return (
    <div>
     <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}/>

         <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
