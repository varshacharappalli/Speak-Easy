import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css";
import Language from './pages/Language';
import { Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path='/language' element={<Language/>}/>
      </Routes>
    </>
  )
}

export default App
