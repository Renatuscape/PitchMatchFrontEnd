import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { LoggedInIcon } from '../Context/contextPage';
import { useEffect, useState } from 'react';
import { useAuth } from '../App';

export function ResponsiveAppBar() {
  const { token } = useAuth();
  const isLoggedIn: boolean = !!token?.accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    const res = localStorage.getItem('logInStatus') === 'true' ? true : false;
   
  }, [token]);
  
  const handleOnClick=()=>{
    navigate('/login');
  }

  return (
    <div className="header-container">
      <Link to="/search">
        <Button
          sx={{ my: 2, color: 'black', display: 'block', "&:focus":{outline: "none",}}}>
          Search
        </Button>
      </Link>
      <Link to="/createpitch">
        <Button sx={{ my: 2, color: 'black', display: 'block', "&:focus":{outline: "none",} }} >
          Create Pitch
        </Button>
      </Link>
      <Link to="/">
        <Button sx={{ my: 2, color: 'black', display: 'block' , "&:focus":{outline: "none",}}}>
          <div className="page-title">PitchMatch</div>
        </Button>
      </Link>
      <Link to="/about">
        <Button sx={{ my: 2, color: 'black', display: 'block', "&:focus":{outline: "none",} }}>
          About
        </Button>
      </Link>
     
        {isLoggedIn ? (<div  style={{marginTop: 'auto'}}><LoggedInIcon/></div>) : (<Button onClick={handleOnClick} sx={{ my: 2, color: 'black', display: 'block' , "&:focus":{outline: "none",}}}>
        Log In
        </Button>)}
      
    </div>
  );
}
export default ResponsiveAppBar;
