import Button from '@mui/material/Button';

export function ResponsiveAppBar() {

  return (
    <div className="header-container">
      <Button
        sx={{ my: 2, color: 'black', display: 'block' }}
      >
        Search
      </Button>
      <Button sx={{ my: 2, color: 'black', display: 'block' }} >
        Create Pitch
      </Button>
      <Button sx={{ my: 2, color: 'black', display: 'block' }}>
        <div className="page-title">PitchMatch</div>
      </Button>


      <Button sx={{ my: 2, color: 'black', display: 'block' }}>
        About
      </Button>
      <Button sx={{ my: 2, color: 'black', display: 'block' }}>
        Log In
      </Button>
    </div>
  );
}
export default ResponsiveAppBar;
