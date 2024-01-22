import './App.css'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter,  Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Search } from './pages/Search';
import { UserPage } from './pages/UserPage';
import { CreateUser } from './pages/CreateUser';
import { EditUser } from './pages/EditUser';
import { PitchPage } from './pages/PitchPage';
import { CreatePitch } from './pages/CreatePitch';
import { EditPitch } from './pages/EditPitch';
import { LogIn } from './pages/LogIn';
import { Verificaiton } from './pages/Verification';
import { Footer } from './components/Footer';
import { ForgotPassword } from './ForgotPassword';
import React from 'react';
import { AuthContext } from './AContext/contextPage';
import { TokenAndId, LogInType } from './components/types';

function App() {

  function LogInFunctionality(userInfo: LogInType): Promise<void> {
    throw new Error('Function not implemented.');
  }

  return (
    <>
        <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user/:id" element={<UserPage/>} />
          <Route path="/user" element={<UserPage/>} />
          <Route path="/createuser" element={<CreateUser/>} />
          <Route path="/edituser/:id" element={<EditUser/>} />
          <Route path="/pitch/:id" element={<PitchPage/>} />
          <Route path="/pitch/" element={<PitchPage/>} />
          <Route path="/createpitch" element={<CreatePitch/>} />
          <Route path="/editpitch/:id" element={<EditPitch/>} />
          <Route path="/verification" element={<Verificaiton/>} />
          <Route path="/login" element={<LogIn LoginFunctionality={LogInFunctionality}/>} />
          <Route path="/forgottenpassword" element={<ForgotPassword/>} />
        </Routes>
        <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App

