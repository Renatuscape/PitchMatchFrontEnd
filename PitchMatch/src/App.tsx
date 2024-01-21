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
import { PitchPage } from './pages/PitchPage';
import { CreatePitch } from './pages/CreatePitch';
import { EditPitch } from './pages/EditPitch';
import { LogIn } from './pages/LogIn';
import { Location } from './pages/Location';
import { Footer } from './components/Footer';
import { ForgotPassword } from './ForgotPassword';
import React from 'react';
import { AuthContext } from './AContext/contextPage';

function App() {
const [token, setToken] = React.useState<TokenAndId>({accessToken:"", Id:0});
async function LogInFunctionality(user:LogInType){
const response= await fetch(`https://pitchmatch.azurewebsites.net/Login`, 
{method:'POST', headers:{'Content-Type':'application/json'} ,body:JSON.stringify(user)});
if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}
 const responseJson=  await response.json()
const LoginResponse:TokenAndId={
  accessToken:responseJson.accessToken,
  Id:responseJson.id
}
setToken(LoginResponse)
console.log(LoginResponse)
};

  return (
    <>
    <AuthContext.Provider value={token}>
        <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user/:id" element={<UserPage/>} />
          <Route path="/user" element={<UserPage/>} />
          <Route path="/mypage" element={<MyPage/>} />
          <Route path="/createuser" element={<CreateUser/>} />
          <Route path="/edituser" element={<EditUser/>} />
          <Route path="/pitch/:id" element={<PitchPage/>} />
          <Route path="/createpitch" element={<CreatePitch/>} />
          <Route path="/editpitch/:id" element={<EditPitch/>} />
          <Route path="/location" element={<Location/>} />
          <Route path="/login" element={<LogIn LoginFunctionality={LogInFunctionality}/>} />
          <Route path="/forgottenpassword" element={<ForgotPassword/>} />
        </Routes>
        <Footer/>
        </BrowserRouter>
        </AuthContext.Provider>
    </>
  )
}

export default App

