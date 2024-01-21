import { Container, Card, CardContent, TextField, CardHeader, Divider, Button, Grid } from "@mui/material";
import { style1 } from "./CreatePitchComponent";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

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
    const res= await fetch("https://pitchmatch.azurewebsites.net/Pitch/"+id,
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
    editPitch: (pitch:Pitch) => void;
}



export function PitchEditCard(props: EditPitchProps){
  const [newPitch, setNewPitch] = useState<Pitch>({
    Id: 0,
    title: "",
    summary: "",
    description: "",
    imgUrl: "",
    videoUrl: "",
    location: "",
    goal: 0,
    pitchYield: 0,
    category: "",
    userId: 0,
  });
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedPitch = await updatePitchAsync(
        newPitch!.Id ,
        newPitch?.title,
        newPitch?.summary,
        newPitch?.description,
        newPitch?.imgUrl,
        newPitch?.videoUrl,
        newPitch?.location,
        newPitch?.goal,
        newPitch?.pitchYield ,
        newPitch?.category
    );
    props.editPitch(updatedPitch);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPitch({ ...newPitch!, [e.target.name]: e.target.value });
  }

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
                  value={newPitch.title}
                  onChange={onChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="summary"
                  label="Pitch Summary (this will be visible to everyone)"
                  value={newPitch.summary}
                  onChange={onChange}
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
                  value={newPitch.description}
                  onChange={onChange}
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
                  value={newPitch.imgUrl}
                  onChange={onChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="video"
                  label="Add a video URL"
                  value={newPitch.videoUrl}
                   onChange={onChange}
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
                  value={newPitch.goal}
                   onChange={onChange}
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
                  value={newPitch.pitchYield}
                  onChange={onChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="location"
                  label="Location"
                  value={newPitch.location}
                  onChange={onChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="category"
                  label="Category"
                  value={newPitch.category}
                  onChange={onChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              </Grid>
              <Link to="/pitch/:id">
            <Button type="submit" variant="contained" color="success" sx={{ marginTop: 2 , "&:focus":{outline: "none",}}}>
              Save
            </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </Container>
</>
}
