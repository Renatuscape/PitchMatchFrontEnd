import { Container, Card, CardContent, TextField, CardHeader, Divider, Button, Grid } from "@mui/material";
import { style1 } from "./CreatePitchComponent";
import { FormEvent, useState } from "react";

export async function updatePitchAsync(id:number,
    title: string,
    summary: string, 
    description: string,
    imgUrl: string,
    videoUrl: string,
    location: string,
    goal: number,
    pitchYield: number,
    category: string ):Promise<Pitch>{
    const res= await fetch("https://pitchmatch.azurewebsites.net/editpitch/"+id,
    {
        method:'PUT',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id,title, summary, description, imgUrl, videoUrl, location, goal, pitchYield, category})
    })
    if(!res.ok){
        throw new Error (res.statusText)
    }
    return await res.json();
};

type EditPitchProps={
    id:number,
    editPitch: (pitch:Pitch) => void;
}

export function PitchEditCard(props: EditPitchProps){
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
    const updatedPitch = await updatePitchAsync(props.id,
        title,
        summary,
        description,
        imgUrl,
        videoUrl,
        location,
        goal,
        pitchYield,
        category);
    
    props.editPitch(updatedPitch);
  };

return<>
 <Container>
      <Card sx={style1}>
        <CardHeader title="Edit your pitch" />
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
            <Button type="submit" variant="contained" color="success" sx={{ marginTop: 2 , "&:focus":{outline: "none",}}}>
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
</>
}
