import './App.css'
import Button from '@mui/material/Button';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function App() {

  return (
    <>
    <ResponsiveAppBar/>
      <p className="read-the-docs">
        Product by FixedCreations
      </p>

      <Button variant="contained">PitchMatch</Button>
      <div></div>
    </>
  )
}

export default App
