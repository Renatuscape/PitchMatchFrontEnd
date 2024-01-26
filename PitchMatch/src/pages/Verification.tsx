import { FormEvent, useState } from 'react';
import { Button, Container, Paper, TextField } from '@mui/material';
import { LocationFinder } from '../components/LocationFinder';
import { getSession } from '../Context/contextPage';
import { DeletePersonalData } from '../components/DeletePersonalData';
import { useNavigate } from 'react-router-dom';

type CreatePersonalDataProps = {
  phoneNumber: string;
  personNr: string;
  address: string;
  latitude: number;
  longitude: number;
  isVerified: boolean;
  userId: number;
}

async function createPersonalDataAsync(personalData: CreatePersonalDataProps): Promise<CreatePersonalDataProps> {
  const response = await fetch('https://pitchmatch.azurewebsites.net/PersonalData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
  const navigate = useNavigate();


  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    if (registeredAddress === null || registeredAddress === '' || registeredAddress === 'Address not found') {
      setErrorMessage(prevErrorMessage => (prevErrorMessage ?? '') + 'Invalid address.');
    }

    const userId = getSession().userId;

    try {
      const res = await createPersonalDataAsync({
        phoneNumber: phoneNumber,
        personNr: personalNumber,
        address: registeredAddress,
        latitude: latitude,
        longitude: longitude,
        isVerified: true,
        userId: getSession().userId
        // userId: userId ?? 6
      });
      navigate('/mypage');

      // Process the successful creation of the data
    } catch (error: any) {
      console.error(error);
      if (error.message) {
        try {
          const errorData = JSON.parse(error.message);
          if (errorData.errors) {
            const errorMessages = Object.values(errorData.errors).flat();
            setErrorMessage(errorMessages.join(' '));
            return;
          }
        }
        catch {
          throw new Error('Unknown error.')
        }
      }
      setErrorMessage('An unexpected error occurred.');
    }
  }

  return <div className='page-background'>
    <Container maxWidth='md' sx={{ paddingTop: 5, paddingBottom: 5, minHeight: '70vh' }}>
      <Paper elevation={3} style={{ marginBottom: 15, minHeight: '70vh' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
          <h2>
            User Verification
          </h2>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          padding: '15px',
          borderTop: 'solid',
          borderWidth: 1,
          borderColor: 'rgba(26, 125, 127, 0.564)'
        }}>
          <Paper elevation={2} style={{ padding: 10, margin: 5 }}>
            <p>Get verified and increase your chances of a good deal! It's an easy, three-step process. At PitchMatch, we try to create a safe, stress-free experience, and we only recommend collaborations with verified users.</p>
          </Paper>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
            <h3>
              Confirm your personal details
            </h3>
            <TextField
              label='Phone number'
              variant="outlined"
              margin="normal"
              fullWidth
              value={phoneNumber}
              placeholder='Enter your phone number here.'
              onChange={(e) => setPhoneNumber(e.target.value)}
              type='text'
            />
            <TextField
              label='Personal number'
              variant="outlined"
              margin="normal"
              fullWidth
              value={personalNumber}
              placeholder='Enter your personal number here.'
              onChange={(e) => setPersonalNumber(e.target.value)}
              type='text'
            />
            <TextField
              label='Find your address on the map'
              variant="outlined"
              margin="normal"
              fullWidth
              placeholder='Find your address on the map below.'
              disabled={true}
              value={registeredAddress}
            />
            <Button type="submit" variant="contained" color="success" sx={{ backgroundColor: "rgb(26,126,127)", color: "lightgreen", marginTop: 2, "&:focus": { outline: "none", } }}>Verify me!</Button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </form>

          <Paper elevation={4} style={{ padding: '0 10px', margin: 10 }}>
            <LocationFinder onRegisterAddress={setRegisteredAddress} onLatitudeChange={setLatitude} onLongitudeChange={setLongitude} />
          </Paper>
          <DeletePersonalData />
        </div>
      </Paper>
    </Container>
  </div>
}