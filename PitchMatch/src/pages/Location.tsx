import React from 'react';
import { Container } from '@mui/material';
import { LocationFinder } from '../components/LocationFinder';

export function Location(){

    return <div className='page-background'>
      <Container maxWidth='md' sx={{ minHeight: '70vh', backgroundColor: 'white', padding: 2, display: 'flex', flexDirection: 'column' }}>
        <h2>Find your location</h2>
        <LocationFinder />
      </Container>
    </div>
  
}