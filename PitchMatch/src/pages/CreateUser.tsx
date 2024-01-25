import { AutoAwesome, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Container, IconButton, Paper } from "@mui/material";
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
      <Container maxWidth='md' sx={{ padding: 2, display: 'flex', alignItems: 'flex-end' }}>
         <Paper elevation={3} style={{ marginBottom: 15, minHeight: '70vh' }}>
         <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
            <h2>Create User</h2>
            </div>
            <form onSubmit={onSubmit} style={{
               display: 'flex', flexDirection: 'column', gap: 10,
               padding: 15,
               borderTop: 'solid',
               borderWidth: 1,
               borderColor: 'rgba(26, 125, 127, 0.564)',
               }}>
               <div className='form-input-container'>
                  <label htmlFor='name'>Full name</label>
                  <input value={user.name} onChange={handleChange} id='name' name='name' type='text' />
               </div>
               <div className='form-input-container'>
                  <label htmlFor="email">Email address</label>
                  <input value={user.email} onChange={handleChange} id='email' name='email' type='email' />
               </div>
               <div className='form-input-container'>
                  <label htmlFor="password">Password</label>
                  <div style={{ margin: 0, display: 'flex', width:'60.4%', justifyContent: 'space-between'}}>
                     <input
                        value={user.password}
                        onChange={handleChange}
                        id='password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                     />
                     <IconButton style={{ flexGrow: 0, borderStyle: 'solid', margin: 0, marginLeft: 0, marginRight: '5px', padding: 0 }} onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                     </IconButton>
                  </div>
               </div>
               <div className='form-input-container'>
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <div style={{ margin: 0, display: 'flex', width:'60.4%', justifyContent: 'space-between'}}>
                    <input
                     value={confirmedPassword}
                     onChange={(e) => setConfirmedPassword(e.target.value)}
                     id='confirmedPassword'
                     name='confirmPassword'
                     type={showPassword ? 'text' : 'password'}
                  />
                                       <IconButton style={{ flexGrow: 0, borderStyle: 'solid', margin: 0, marginLeft: 0, marginRight: '5px', padding: 0 }} onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                     </IconButton>
                     </div>
               </div>
               <div style={{ padding: 20, marginTop: 10, borderRadius: 4, backgroundColor: 'rgb(26,126,127, 0.1)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ paddingBottom: 15 }}>This section is information that other users will be able to see on your profile page when they are logged in. These fields are not required, but will improve your chances of finding a match. You can update your profile with this information later, if you prefer.</p>
                  <div>
                     <label htmlFor="bio"><p>Tell us about yourself!</p></label>
                     <textarea value={user.bio} onChange={handleChange} id='bio' name='bio' style={{ width: '100%' }} />
                  </div>
                  <div>
                     <label htmlFor="contact"><p>If you want other users to contact you directly, share your information here. If you leave it blank, other users will only be able to contact you through a pitch</p></label>
                     <input value={user.contact} onChange={handleChange} id='contact' name='contact' type='text' />
                  </div>
                  <div>
                     <label htmlFor="soMe"><p>Share a link to your favourite social media</p></label>
                     <input value={user.soMe} onChange={handleChange} id='soMe' name='soMe' type='text' />
                  </div>
                  <div>
                     <label htmlFor='imgUrl'><p>Link us to a picture of your beautiful self</p></label>
                     <input value={user.imgUrl} onChange={handleChange} id='imgUrl' name='imgUrl' type='text' />
                  </div>
                  <div>
                     <label htmlFor='cvUrl'><p>A link to your CV will improve your matches</p></label>
                     <input value={user.cvUrl} onChange={handleChange} id='cvUrl' name='cvUrl' type='text' />
                  </div>
               </div>
               {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
               <Button variant='contained' color={'success'} type="submit">Submit</Button>
            </form>
         </Paper>
      </Container>
   </div>
}