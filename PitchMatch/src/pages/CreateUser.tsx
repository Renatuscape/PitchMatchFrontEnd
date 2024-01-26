import { AutoAwesome, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Container, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

type CreateUserProps = {
   name: string;
   email: string;
   password: string;
   bio: string;
   contact: string;
   soMe: string;
   imgUrl: string;
   cvUrl: string;
}

async function createUserAsync(user: CreateUserProps): Promise<CreateUserProps> {
   const response = await fetch('https://pitchmatch.azurewebsites.net/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
   })
   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
   }

   return response.json();
}

export function CreateUser() {
   const [user, setUser] = useState<CreateUserProps>({ name: '', email: '', password: '', bio: '', contact: '', soMe: '', imgUrl: '', cvUrl: '' })
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const [confirmedPassword, setConfirmedPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();


   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage(null);
      if (user.password !== confirmedPassword) {
         setErrorMessage("Passwords don't match.");
         return;
      }
      try {
         const res = await createUserAsync({
            name: user.name,
            email: user.email,
            password: user.password,
            bio: user.bio,
            contact: user.contact,
            soMe: user.soMe,
            imgUrl: user.imgUrl,
            cvUrl: user.cvUrl
         });
         navigate('/login');

         // Process the successful creation of the user
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
   }
   const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }
   return <div className='page-background'>
      <Container maxWidth='md' sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', textAlign: 'center' }}>
         <Paper elevation={3} style={{ marginBottom: 15, minHeight: '70vh' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
               <h2>Create User</h2>
            </div>
            <form onSubmit={onSubmit} style={{
               display: 'flex', flexDirection: 'column', gap: 10,
               padding: '15px',
               borderTop: 'solid',
               borderWidth: 1,
               borderColor: 'rgba(26, 125, 127, 0.564)',
            }}>
               <TextField
                  label='Full name'
                  variant="outlined"
                  margin="none"
                  fullWidth
                  value={user.name}
                  onChange={handleChange}
                  id='name'
                  name='name'
                  type='text'
                  required/>
                  
               <TextField
                  label='Email address'
                  variant="outlined"
                  margin="none"
                  fullWidth
                  value={user.email} onChange={handleChange}
                  id='email'
                  name='email'
                  type='email'
                  required
               />
               <TextField
                  label='Password'
                  variant="outlined"
                  margin="none"
                  fullWidth
                  value={user.password}
                  onChange={handleChange}
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position="end">
                           <IconButton onClick={() => handleTogglePasswordVisibility()}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />
               <TextField
                  label='Confirm password'
                  variant="outlined"
                  margin="none"
                  fullWidth
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  id='confirmedPassword'
                  name='confirmPassword'
                  required
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position="end">
                           <IconButton onClick={() => handleTogglePasswordVisibility()}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />
               <div style={{ padding: 20, marginTop: 10, borderRadius: 4, backgroundColor: 'rgb(26,126,127, 0.1)', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <h2>Optional information</h2>
                  <p style={{ paddingBottom: 15 }}>This section is information that other users will be able to see on your profile page when they are logged in. These fields are not required, but will improve your chances of finding a match. You can update your profile with this information later, if you prefer.</p>
                  <div>
                  <TextField
                  label='Tell us about yourself'
                  variant="outlined"
                  margin="none"
                  fullWidth
                  multiline rows={4}
                  sx={{backgroundColor: 'white'}}
                  value={user.bio} onChange={handleChange} id='bio' name='bio' style={{ width: '100%' }} />
                  </div>
                  <div>
                  <TextField
                  label='Share a phone number or email on your profile'
                  variant="outlined"
                  margin="none"
                  sx={{backgroundColor: 'white'}}
                  fullWidth
                  value={user.contact} onChange={handleChange} id='contact' name='contact' type='text' />
                  </div>
                  <div>
                  <TextField
                  label='Link to your favourite social media profile'
                  variant="outlined"
                  margin="none"
                  sx={{backgroundColor: 'white'}}
                  fullWidth
                  value={user.soMe} onChange={handleChange} id='soMe' name='soMe' type='text' />
                  </div>
                  <div>
                  <TextField
                  label='Link to a profile picture'
                  variant="outlined"
                  margin="none"
                  style={{backgroundColor: 'white'}}
                  fullWidth
                  value={user.imgUrl} onChange={handleChange} id='imgUrl' name='imgUrl' type='text' />
                  </div>
                  <div>
                  <TextField
                  label='Link to your CV'
                  variant="outlined"
                  margin="none"
                  style={{backgroundColor: 'white'}}
                  fullWidth value={user.cvUrl} onChange={handleChange} id='cvUrl' name='cvUrl' type='text' />
                  </div>
               </div>
               {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
               <Button variant='contained' color={'success'} type="submit" sx={{ backgroundColor: "rgb(26,126,127)", color: "lightgreen" }}>Submit</Button>
            </form>
         </Paper>
      </Container>
   </div>
}