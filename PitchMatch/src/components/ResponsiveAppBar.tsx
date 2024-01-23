import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { LoggedInIcon } from '../Context/contextPage';

export function ResponsiveAppBar() {

const isLoggedIn: boolean = localStorage.getItem('logInStatus') === 'true' ? true : false
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
        {isLoggedIn ? (<LoggedInIcon />) : (<Link to="/login"> <Button sx={{ my: 2, color: 'black', display: 'block' , "&:focus":{outline: "none",}}}>
          Log In
        </Button></Link>)}
    </div>
  );
}
export default ResponsiveAppBar;
