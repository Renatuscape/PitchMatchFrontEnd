import './App.css'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter,  Navigate,  Routes, useNavigate } from 'react-router-dom';
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
import {LogInFunctionality, getUserSessionInfo} from './Context/contextPage'
import React from 'react';
import { TokenAndId } from './components/types';

const AuthContext = React.createContext<{
    token: TokenAndId | null;
    onLogin: (tokenAndId: TokenAndId) => void;
    onLogout: () => void;
} | undefined>(undefined);

type ProtectedRouteProps = {
    children?: JSX.Element;
}


function App() {
    const [token, setToken] = React.useState<TokenAndId | null>(null);
    function ProtectedRoute(props: ProtectedRouteProps) {

        const isLoggedIn = localStorage.getItem('logInStatus') === 'true' ? true : false;
 
        if (!isLoggedIn) {
            return <Navigate to="/login"/>
        }
                return <>
            {props.children}
        </>
    }

  return (
    <>
    <AuthProvider>
        <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/createuser" element={<CreateUser/>} />
          <Route path="/login" element={<LogIn LoginFunctionality={LogInFunctionality}/>} />
          <Route path={"/"}
                               element={
                                <ProtectedRoute>
                                    <>
                                    <Route path="/pitch/" element={<PitchPage/>} />
                                    <Route path="/user" element={<UserPage/>} />
                                    <Route path="/editpitch/:id" element={<EditPitch/>} />
                                    <Route path="/verification" element={<Verificaiton/>} />
                                    <Route path="/createpitch" element={<CreatePitch/>} />
                                    <Route path="/search" element={<Search />} />
                                    <Route path="/user/:id" element={<UserPage/>} />
                                    <Route path="/edituser/:id" element={<EditUser/>} />
                                    <Route path="/pitch/:id" element={<PitchPage/>} />
                                        {/* Multiple children go here */}
                                    </>
                                </ProtectedRoute>
                            } />


          <Route path="/forgottenpassword" element={<ForgotPassword/>} />
        </Routes>
        <Footer/>
        </BrowserRouter>
        </AuthProvider>
    </>
  )
}

// AuthProvider component for handling authentication
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = React.useState<TokenAndId | null>(null);

const handleLogin = (tokenAndId: TokenAndId) => {
    try {
        setToken(tokenAndId);
        navigate('/');
    } catch (error) {
        console.error('Error during login:', error);
    }
};
  const handleLogout = () => {
    setToken(null);
  };
 const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const tokenAndId = React.useContext(AuthContext);
  if (!tokenAndId) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return tokenAndId;
};
export default App

