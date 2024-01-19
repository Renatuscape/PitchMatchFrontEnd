import './App.css'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter,  Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Search } from './pages/Search';
import { UserPage } from './pages/UserPage';
import { MyPage } from './pages/MyPage';
import { CreateUser } from './pages/CreateUser';
import { EditUser } from './pages/EditUser';
import { PitchPage } from './PitchPage';
import { CreatePitch } from './pages/CreatePitch';
import { EditPitch } from './pages/EditPitch';
import { LogIn } from './LogIn';
import { Footer } from './components/Footer';

function App() {

  return (
    <>
        <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user/:id" element={<UserPage/>} />
          <Route path="/user/" element={<UserPage/>} />
          <Route path="/mypage" element={<MyPage/>} />
          <Route path="/createuser" element={<CreateUser/>} />
          <Route path="/edituser" element={<EditUser/>} />
          <Route path="/pitchpage" element={<PitchPage/>} />
          <Route path="/createpitch" element={<CreatePitch/>} />
          <Route path="/editpitch" element={<EditPitch/>} />
          <Route path="/login" element={<LogIn/>} />
        </Routes>
        <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
