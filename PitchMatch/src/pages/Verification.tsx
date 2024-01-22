import React, { useState } from 'react';
import { Container } from '@mui/material';
import { LocationFinder } from '../components/LocationFinder';

export function Verificaiton() {
  const [registeredAddress, setRegisteredAddress] = useState('');

  return <div className='page-background'>
    <Container maxWidth='md' sx={{ minHeight: '70vh', backgroundColor: 'white', padding: 2, display: 'flex', flexDirection: 'column' }}>
      <h2>User Verification</h2>
      <p>Get verified and increase your chances of a good deal! It's an easy, three-step process. At PitchMatch, we try to create a safe, stress-free experience, and we only recommend collaborations with verified users.</p>
      <h3>Phone Number</h3>
      <input style={{ flexGrow: '8', height: 20, padding: 10, fontSize: '100%'}}></input>
      <p></p>
      <h3>Personal Number</h3>
      <input style={{ flexGrow: '8', height: 20, padding: 10, fontSize: '100%'}}></input>
      <p>Get in touch if you have other ID that can verify your identity, such as an immigrant's passport, foreign passport or refugee travel document.</p>
      <h3>Address</h3>
      <LocationFinder onRegisterAddress={setRegisteredAddress} />
    </Container>
  </div>

}