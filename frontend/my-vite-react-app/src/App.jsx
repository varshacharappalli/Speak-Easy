import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css";
import Language from './pages/Language';
import { Routes, Route, Link } from "react-router-dom";
import Scenario from './pages/scenario';
import Conversation from './pages/Conversation';


function App() {

  return (
    <>
      <Routes>
        <Route path='/language' element={<Language/>}/>
        <Route path="/scenario" element={<Scenario/>} />
        <Route path="/conversation" element={<Conversation/>} />
      </Routes>
    </>
  )
}

export default App
