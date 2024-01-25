import React, { FormEvent, useState, useContext } from 'react';
import { Container, Card, CardHeader, Button, Divider, CardContent, TextField, Grid, InputAdornment, Paper } from "@mui/material";
import { Pitch } from './types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSession } from '../Context/contextPage';
import { useAuth } from '../App';
import { LocationFinder } from './LocationFinder';

const API_URL = 'https://pitchmatch.azurewebsites.net/Pitch';

async function createPitch(
  title: string,
  summary: string,
  description: string,
  imgUrl: string,
  videoUrl: string,
  goal: number,
  pitchYield: number,
  categories: string,
  longitude: number,
  latitude: number,
  registeredAddress: string,
  location: string,
): Promise<Pitch> {

  const res = await fetch(
    `${API_URL}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: getSession().userId,
        title,
        summary,
        description,
        imgUrl,
        videoUrl,
        goal,
        pitchYield,
        categories,
        longitude,
        latitude,
        registeredAddress,
        location,
      })
    });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(JSON.stringify(errorData));
  }

  const createdPitch = await res.json();
  return createdPitch;
}

export type CreatePitchFormProps = {
  addPitch: (pitch: Pitch) => void;
}

export default function CreatePitchComponent(props: CreatePitchFormProps) {
  const { token } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [goal, setGoal] = useState<number>(0);
  const [pitchYield, setPitchYield] = useState<number>(0);
  const [categories, setCategories] = useState('');
  const [registeredAddress, setRegisteredAddress] = useState('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [location, setLocation] = useState('');


  const handleAddressChange = (address: string) => {
    setRegisteredAddress(address);
    setLocation(address);
  };


  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      console.log('not token found');
      return;
    }
    try {
      const createdPitch = await createPitch(
        title,
        summary,
        description,
        imgUrl,
        videoUrl,
        goal,
        pitchYield,
        categories,
        longitude,
        latitude,
        registeredAddress,
        location,
      );
      props.addPitch(createdPitch);
      navigate(`/pitch/${createdPitch.id}`);
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
  };

  return (<div className='page-background'>
    <Container maxWidth='md' sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', textAlign: 'center' }}>
      <Paper elevation={3} style={{ marginBottom: 15, minHeight: '70vh' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
          <h2>Create Pitch</h2>
        </div>
        <CardContent style={{
          display: 'flex', flexDirection: 'column',
          borderTop: 'solid',
          borderWidth: 1,
          borderColor: 'rgba(26, 125, 127, 0.564)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="summary"
                  label="Pitch Summary (this will be visible to everyone)"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Write about your proposal (this will only be shown to verified users)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="picture"
                  label="Add a picture URL"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="video"
                  label="Add a video URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="goal"
                  label="Goal Capital"
                  type="number"
                  value={goal.toString()}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="pitchYield"
                  label="Projected annual yield"
                  type="number"
                  value={pitchYield.toString()}
                  onChange={(e) => setPitchYield(Number(e.target.value))}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="categories"
                  label="Category"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={true}
                  name="location"
                  label="Choose location on the map below"
                  value={location}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '5px 10px' }}>
                  <LocationFinder
                    onRegisterAddress={handleAddressChange}
                    onLatitudeChange={setLatitude}
                    onLongitudeChange={setLongitude}
                  />
                </Paper>
              </Grid>
            </Grid>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <Button type="submit" variant="contained" color="success" sx={{ "&:focus": { outline: "none", } }}>
              Create
            </Button>
          </form>
        </CardContent>
      </Paper>
    </Container>
  </div>
  );
}

export const style1 = {
  margin: "0 35px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
