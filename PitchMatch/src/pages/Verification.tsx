import { FormEvent, useState } from 'react';
import { Button, Card, Container } from '@mui/material';
import { LocationFinder } from '../components/LocationFinder';

type CreatePersonalDataProps = {
  phoneNumber: string;
  personNr: string;
  address: string;
  latitude: number;
  longitude: number;
  isVerified: boolean;
}

async function createPersonalDataAsync(personalData: CreatePersonalDataProps): Promise<CreatePersonalDataProps> {
  const response = await fetch('https://pitchmatch.azurewebsites.net/PersonalData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(personalData)
  })
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }

  return response.json();
}

export function Verificaiton() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [personalNumber, setPersonalNumber] = useState<string>('');
  const [registeredAddress, setRegisteredAddress] = useState('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    if (registeredAddress === null || registeredAddress === '' || registeredAddress === 'Address not found') {
      setErrorMessage(prevErrorMessage => (prevErrorMessage ?? '') + 'Invalid address.');
    }
    try {
      const res = await createPersonalDataAsync({
        phoneNumber: phoneNumber,
        personNr: personalNumber,
        address: registeredAddress,
        latitude: latitude,
        longitude: longitude,
        isVerified: true,
      });

      // Process the successful creation of the user
    } catch (error: any) {
      if (error.message) {
        const errorData = JSON.parse(error.message);
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          setErrorMessage(errorMessages.join(' '));
          return;
        }
      }
      setErrorMessage('An unexpected error occurred.');
    }
  }

  return <div className='page-background'>
    <Container maxWidth='md' sx={{ paddingTop: 5, paddingBottom: 5, minHeight: '70vh' }}>
      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ borderBottom: 'solid', borderWidth: 1, padding: 15, textAlign: 'center' }}>
          User Verification
        </h2>
        <div style={{ padding: 15 }}>
          <p>Get verified and increase your chances of a good deal! It's an easy, three-step process. At PitchMatch, we try to create a safe, stress-free experience, and we only recommend collaborations with verified users.</p>
          <h3 style={{ marginTop: 15 }}>Confirm your personal details</h3>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', margin: '10px 0px' }}>
              <label>Phone Number</label>
              <input
                value={phoneNumber}
                placeholder='Enter your phone number here.'
                onChange={(e) => setPhoneNumber(e.target.value)}
                type='text'
                pattern="[0-9]{8}"
                style={{ flexGrow: '8', height: 20, padding: 10, fontSize: '100%' }} />
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', margin: '10px 0px' }}>
              <label>Personal Number</label>
              <input
                value={personalNumber}
                placeholder='Enter your personal number here.'
                onChange={(e) => setPersonalNumber(e.target.value)}
                type='text'
                pattern="[0-9]{11}"
                style={{ flexGrow: '8', height: 20, padding: 10, fontSize: '100%' }} />
            </div>

            <div style={{ display: 'flex', gap: 20, alignItems: 'center', margin: '10px 0px' }}>
              <label>Registered Address</label>
              <input placeholder='Find your address on the map below.' disabled={true} value={registeredAddress} style={{ flexGrow: '8', height: 20, padding: 10, fontSize: '100%' }}></input>
            </div>
            <Button>Verify me!</Button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </form>

          <div style={{ padding: 10, margin: 10, border: 'solid', borderWidth: 1, borderRadius: 15 }}>
            <h3 style={{ borderBottom: 'solid', borderWidth: 1, marginLeft: -10, marginRight: -10, padding: 10, paddingTop: 0 }}>Find your address</h3>
            <LocationFinder onRegisterAddress={setRegisteredAddress} />
          </div>
        </div>
      </Card>
    </Container>
  </div>
}