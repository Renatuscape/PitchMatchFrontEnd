import React from 'react';
import LocationInputMap from '../components/LocationFinder';
import { Container } from '@mui/material';

export const Location: React.FC = () => {
    return <div className='page-background'>
        <Container maxWidth='md' sx={{ minHeight: '70vh', backgroundColor: 'white', padding: 2, display: 'flex', flexDirection:'column'}}>
            <h2>Find your location</h2>
            <LocationInputMap onLocationChange={(location) => console.log(location)} />
        </Container>
    </div>
  };