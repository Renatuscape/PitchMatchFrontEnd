import { Container, Card, CardContent, TextField, CardHeader, Divider, Button, Grid, Typography, Box } from "@mui/material";
import { style1 } from "./CreatePitchComponent";
import { FormEvent, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { UserParamsType } from "../pages/UserPage";
import { DeleteUserButton } from "./DeleteUserComponent";

type EditUserProps = {
    name: string;
    email: string;
    password: string;
    bio: string;
    contact: string;
    soMe: string;
    imgUrl: string;
    cvUrl: string;
    }

export async function updateUserAsync(newUser:EditUserProps, id:number ):Promise<EditUserProps>{
    const res= await fetch(`https://pitchmatch.azurewebsites.net/User?id=${id}`,
    {
        method:'PUT',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    })
     if (!res.ok) {
      const errorData = await res.json();
      throw new Error(JSON.stringify(errorData));
   }
    return await res.json();
};


export function UserEditCard() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {id} = useParams<keyof UserParamsType>() as UserParamsType;
  const [newUser, setNewUser] = useState<EditUserProps>({
    name: "",
    email: "",
    password: "",
    bio: "",
    contact: "",
    soMe: "",
    imgUrl: "",
    cvUrl: "",
  });
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const res = await updateUserAsync(newUser, parseInt(id, 10));
      setNewUser(res);
      
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
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    return (
        <>
          <Container>
            <Card sx={style1}>
              <CardHeader title="Edit Profile" />
              <Divider />
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Name"
                        name="name"
                        value={newUser.name}
                        onChange={onChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={newUser.email}
                        onChange={onChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={newUser.password}
                        onChange={onChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Bio"
                        name="bio"
                        value={newUser.bio}
                        onChange={onChange}
                        fullWidth
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Contact"
                        name="contact"
                        value={newUser.contact}
                        onChange={onChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Social Media Link"
                        name="soMe"
                        value={newUser.soMe}
                        onChange={onChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Profile Image URL"
                        name="imgUrl"
                        value={newUser.imgUrl}
                        onChange={onChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="CV URL"
                        name="cvUrl"
                        value={newUser.cvUrl}
                        onChange={onChange}
                        fullWidth
                      />
                    </Grid>
                    {errorMessage && (
                      <Grid item xs={12}>
                        <Typography color="error">{errorMessage}</Typography>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Link to="/">
                <DeleteUserButton id={id}/>
                </Link>
                <Link to={`/user/${id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="secondary">
                    Cancel
                  </Button>
                </Link>
              </Box>
            </Card>
          </Container>
        </>
      );
    }