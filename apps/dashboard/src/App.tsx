import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Demo from './Demo';
import { Landing } from './pages/Landing';

function App() {
  return (
   <>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/dashboard" element={ <Demo/>}/>
      <Route path="/" element={ <Landing />}/>
    </Routes>
  </BrowserRouter></>
  )
}

export default App
