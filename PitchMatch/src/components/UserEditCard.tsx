import { Container, Card, CardContent, TextField, CardHeader, Divider, Button, Grid, Typography, Box, Paper } from "@mui/material";
import { style1 } from "./CreatePitchComponent";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserParamsType, getUser } from "../pages/UserPage";
import { DeleteUserButton } from "./DeleteUserComponent";
import { useAuth } from "../App";

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

export async function updateUserAsync(newUser: EditUserProps, id: number): Promise<EditUserProps> {
  const res = await fetch(`https://pitchmatch.azurewebsites.net/User?id=${id}`,
    {
      method: 'PUT',
      headers: {
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
  const { token } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { id } = useParams<keyof UserParamsType>() as UserParamsType;
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!token) {
      return;
    }

    getUser(token?.userId).then((res) => setNewUser({
      ...res,
      password: ""
    }));
  }, [token])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const res = await updateUserAsync(newUser, token!.userId);
      setNewUser(res);
      navigate(`/mypage`);
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

  const handlerCancel = () => {
    navigate(`/user/${id}`);
  }

  return (
    <>
      <div className='page-background'>
        <Container maxWidth='md' sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
              <h2>Edit your profile</h2>
            </div>
            <CardContent style={{
              display: 'flex', borderTop: 'solid',
              borderWidth: 1,
              borderColor: 'rgba(26, 125, 127, 0.564)',
            }}>
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
                  </Grid>
                </Grid>
              </form>
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10}}>
              <Button type="submit" variant="contained" color="success">
                Save Changes
              </Button>
              <div style={{display:'flex', gap: 10}}>
              <Button onClick={handlerCancel} variant="contained" color="success">
                Cancel
              </Button>
              <DeleteUserButton />
              </div>
            </div>
          </Paper>
        </Container>
      </div>
    </>
  );
}