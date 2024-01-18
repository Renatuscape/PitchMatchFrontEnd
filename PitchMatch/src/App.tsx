import './App.css'
import Button from '@mui/material/Button';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';

function App() {

  return (
    <>
        <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
  
        </Routes>
        <p className="read-the-docs">
          Product by FixedCreations
        </p>
        </BrowserRouter>
    </>
  )
}

export default App
