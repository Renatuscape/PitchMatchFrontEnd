import { Container, Card, CardContent, TextField, CardHeader, Divider, Button, Grid } from "@mui/material";
import { style1 } from "./CreatePitchComponent";
import { FormEvent, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { UserParamsType } from "../pages/UserPage";
type EditPitchProps = {
    Id: number;
    title: string; 
    summary: string; 
    description: string;
    imgUrl: string;
    videoUrl: string;
    location: string;
    goal: number;
    pitchYield: number;
    category: string;
    }

export async function updatePitchAsync(newPitch:EditPitchProps, id:number ):Promise<EditPitchProps>{
    const res= await fetch(`https://pitchmatch.azurewebsites.net/Pitch/${id}`,
    {
        method:'PUT',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPitch)
    })
    if(!res.ok){
        throw new Error (res.statusText)
    }
    return await res.json();
};


export function PitchEditCard(){
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {id} = useParams<keyof UserParamsType>() as UserParamsType;
  const [newPitch, setNewPitch] = useState<EditPitchProps>({
    Id: NaN,
    title: "",
    summary: "",
    description: "",
    imgUrl: "",
    videoUrl: "",
    location: "",
    goal: 0,
    pitchYield: 0,
    category: "",
  });
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const res = await updatePitchAsync(newPitch, parseInt(id, 10));
      setNewPitch(res);
      
    } catch (error: any) {
      if (error.message) {
        const errorData = JSON.parse(error.message);
        if (errorData.errors) {
          const errorMessage = Object.values(errorData.errors).flat();
          setErrorMessage(errorMessage.join(" "));
          return;
        }
      }
      setErrorMessage(error.message);
    }

  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPitch({ ...newPitch, [e.target.name]: e.target.value });
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
                  name="imgUrl"
                  label="Add a picture URL"
                type="url"
                  value={newPitch.imgUrl}
                  onChange={onChange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="videoUrl"
                  label="Add a video URL"
                  value={newPitch.videoUrl}
                  type="url"
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
          </form>
              <Link to={`/pitch/${id}`}>
            <Button type="submit" variant="contained" color="success" sx={{ marginTop: 2 , "&:focus":{outline: "none",}}}>
              Save
            </Button>
            </Link>
        </CardContent>
      </Card>
    </Container>
</>
}

