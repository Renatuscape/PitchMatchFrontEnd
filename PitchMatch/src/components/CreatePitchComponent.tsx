import React, { FormEvent, useState } from 'react';
import { Container, Card, CardHeader, Button, Divider, CardContent, TextField } from "@mui/material";

type Pitch = {
    title: string; 
    summary: string; 
    description: string;
    imgUrl: string;
    videoUrl: string;
    location: string;
    goal: number;
    pitchYield: number;
    category: string;
  };

const API_URL = 'https://purple-mushroom-04dc86703.4.azurestaticapps.net/';

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
    `${API_URL}/createpitch`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, summary, description, imgUrl, videoUrl, location, goal, pitchYield, category })
    });

  if (!res.ok) {
    throw new Error('could not create album');
  }

  return await res.json();
}

type CreatePitchFormProps = {
    addPitch: (pitch: Pitch) => void;
  }

export default function CreatePitchComponent(props: CreatePitchFormProps) {
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
  };

  return (
    <Container>
      <Card sx={style1}>
        <CardHeader title="Create Pitch" sx={{ textAlign: 'center' }} />
        <Divider />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
              name="title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
            />
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
            <TextField
              name="picture"
              label="Write about your proposal (this will only be shown to verified users)"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={6}
            />
            <TextField
              name="video"
              label="Write about your proposal (this will only be shown to verified users)"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={6}
            />
            <TextField
              name="location"
              label="Write about your proposal (this will only be shown to verified users)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={6}
            />
            <TextField
              name="goal"
              label="Write about your proposal (this will only be shown to verified users)"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={6}
            />
            <TextField
              name="pitchYield"
              label="Write about your proposal (this will only be shown to verified users)"
              value={pitchYield}
              onChange={(e) => setPitchYield(Number(e.target.value))}
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={6}
            />
            <TextField
              name="category"
              label="Write about your proposal (this will only be shown to verified users)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={6}
            />
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

const style1 = {
  marginTop: "35px",
  marginBottom: "35px",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
