import React, { FormEvent, useState } from 'react';
import { Container, Card, CardHeader, Button, Divider, CardContent, TextField, Grid } from "@mui/material";
import { Pitch } from './types';

const API_URL = 'https://pitchmatch.azurewebsites.net/Pitch';

async function createPitch(
    title: string,
    summary: string, 
    description: string,
    imgUrl: string,
    videoUrl: string,
    location: string,
    goal: number,
    pitchYield: number,
    category: string
    ): Promise<Pitch> {

const res = await fetch(
    `${API_URL}`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, summary, description, imgUrl, videoUrl, location, goal, pitchYield, category, userId: 6 })
    });

  if (!res.ok) {
      const errorData = await res.json();
      throw new Error(JSON.stringify(errorData));
   }

  const createdPitch = await res.json();
  
  return createdPitch;
}

type CreatePitchFormProps = {
    addPitch: (pitch: Pitch) => void;
  }

export default function CreatePitchComponent(props: CreatePitchFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [location, setLocation] = useState('');
  const [goal, setGoal] = useState<number>(0);
  const [pitchYield, setPitchYield] = useState<number>(0);
  const [category, setCategory] = useState('');


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
    const createdPitch = await createPitch(
        title,
        summary,
        description,
        imgUrl,
        videoUrl,
        location,
        goal,
        pitchYield,
        category
    );
    props.addPitch(createdPitch);
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

  return (
    <Container>
      <Card sx={style1}>
        <CardHeader title="Create Pitch" sx={{ textAlign: 'center' }} />
        <Divider />
        <CardContent>
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
                  value={goal}
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
                  value={pitchYield}
                  onChange={(e) => setPitchYield(Number(e.target.value))}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="location"
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="category"
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              </Grid>
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 , "&:focus":{outline: "none",}}}>
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export const style1 = {
  margin: "0 35px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
