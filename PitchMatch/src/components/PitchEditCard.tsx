import { Container, Card, CardContent, TextField, CardHeader, Divider, Button, Grid, Box } from "@mui/material";
import { style1 } from "./CreatePitchComponent";
import { FormEvent, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { UserParamsType } from "../pages/UserPage";
import { DeletePitchButton } from "./DeletePitchComponent";
import { useAuth } from "../App";
import { TokenAndId } from "./types";
type EditPitchProps = {
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
    const res= await fetch(`https://pitchmatch.azurewebsites.net/Pitch/${id}?pitchId=${id}`,
    {
        method:'PUT',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPitch)
    })
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(JSON.stringify(errorData));
   }

    return await res.json();
};


export function PitchEditCard(){
  const { token } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {id} = useParams<keyof UserParamsType>() as UserParamsType;
  const [newPitch, setNewPitch] = useState<EditPitchProps>({
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
    if (!token) {
      return;
    }
    try {
      const res = await updatePitchAsync(newPitch, token.userId);
      setNewPitch(res);
      
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
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <Link to={`/pitch/${id}`} style={{ margin:'2',textDecoration: 'none' }}>
            <Button type="submit" variant="contained" color="success" sx={{ margin: 2 , "&:focus":{outline: "none",}}}>
              Save
            </Button>
            </Link>
          </form>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Link to={"/"} style={{ textDecoration: 'none' }}>
          {token && <DeletePitchButton id={token.userId} />}
          </Link>
          {token && <Link to={`/pitch/${token.userId}`} style={{ margin:'2',textDecoration: 'none' }}>
                  <Button variant="contained" color="secondary">
                    Cancel
                  </Button>
          </Link>}
        </Box>
      </Card>
    </Container>
</>
}

