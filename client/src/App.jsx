import React from 'react'
import { Routes , Route,  } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'


const App = () => {


  return (
    <div>
     <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
      </Routes>
    </div>
  )
}

export default App
