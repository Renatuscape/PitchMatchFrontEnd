import './App.css'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter, Link, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Search } from './pages/Search';
import { UserPage } from './pages/UserPage';
import { MyPage } from './pages/MyPage';
import { CreateUser } from './pages/CreateUser';
import { EditUser } from './pages/EditUser';
import { PitchPage } from './pages/PitchPage';
import { CreatePitch } from './pages/CreatePitch';
import { EditPitch } from './pages/EditPitch';
import { LogIn } from './LogIn';

function App() {

  return (
    <>
        <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user" element={<UserPage/>} />
          <Route path="/mypage" element={<MyPage/>} />
          <Route path="/createuser" element={<CreateUser/>} />
          <Route path="/edituser" element={<EditUser/>} />
          <Route path="/pitchpage" element={<PitchPage/>} />
          <Route path="/createpitch" element={<CreatePitch/>} />
          <Route path="/editpitch" element={<EditPitch/>} />
          <Route path="/login" element={<LogIn/>} />
        </Routes>
        <p className="read-the-docs">
          Product by FixedCreations
        </p>
        </BrowserRouter>
    </>
  )
}

export default App
