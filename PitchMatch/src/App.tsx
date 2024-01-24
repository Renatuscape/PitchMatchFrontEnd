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
import {LogInFunctionality, getSession, getUserSessionInfo} from './Context/contextPage'
import React, { useEffect } from 'react';
import { LogInType, TokenAndId } from './components/types';
import { MyPage } from './pages/MyPage';

const AuthContext = React.createContext<{
    token: TokenAndId | null;
    // onLogin: (tokenAndId: TokenAndId) => void;
    onLogin: (user: LogInType) => void;
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
        <BrowserRouter>
        <AuthProvider>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/createuser" element={<CreateUser/>} />
          {/* <Route path="/login" element={<LogIn LoginFunctionality={LogInFunctionality}/>} /> */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgottenpassword" element={<ForgotPassword/>} />
         <Route path="/editpitch/:id" element={ <ProtectedRoute>
                                                    <EditPitch />
                                                </ProtectedRoute>
                                              }
                                               />                                       
         <Route path="/verification" element={ <ProtectedRoute>
                                                    <Verificaiton />
                                                </ProtectedRoute>
                                              }
                                                />
          <Route path="/createpitch" element={ <ProtectedRoute>
                                                    <CreatePitch />
                                                </ProtectedRoute>
                                              }
                                                />
          <Route path="/search" element={ <ProtectedRoute>
                                                   <Search />
                                                </ProtectedRoute>
                                              }
                                                />
          <Route path="/user/:id" element={ <ProtectedRoute>
                                                    <UserPage/>
                                                </ProtectedRoute>
                                              }
                                                />
          <Route path="/edituser" element={ <ProtectedRoute>
                                                    <EditUser/>
                                                </ProtectedRoute>
                                              }
                                                />
          <Route path="/pitch/:id" element={ <ProtectedRoute>
                                                    <PitchPage/>
                                                </ProtectedRoute>
                                              }
                                                />
         <Route path="/mypage" element={ <ProtectedRoute>
                                                    <MyPage/>
                                            </ProtectedRoute>
                                              }
                                                />
        </Routes>
        <Footer/>
        </AuthProvider>
        </BrowserRouter>
    </>
  )
}

// AuthProvider component for handling authentication
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = React.useState<TokenAndId | null>(null);
  
  useEffect(() => {
    setToken(getSession())
  }, [])

const handleLogin = async (user: LogInType) => {
   const response = await fetch(`https://pitchmatch.azurewebsites.net/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const responseJson = await response.json();
  const LoginResponse: TokenAndId = {
    accessToken: responseJson.accessToken,
    userId: responseJson.userId,
    IsLogged: true,
    expiresIn: responseJson.expiresIn,
  };
  localStorage.setItem("token", `${LoginResponse.accessToken}`);
  localStorage.setItem("userId", `${LoginResponse.userId}`);
  localStorage.setItem("logInStatus", `${LoginResponse.IsLogged}`);
  localStorage.setItem("expiresIn", `${LoginResponse.expiresIn}`);
  setToken(LoginResponse);
  navigate('/');
};
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('logInStatus');
    localStorage.removeItem('expiresIn');
    navigate('/login');
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

