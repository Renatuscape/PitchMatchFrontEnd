import { AutoAwesome } from "@mui/icons-material";
import { Container } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';

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

   if (!response.ok) { throw new Error(response.statusText) };
   return response.json()
}

export function CreateUser() {
   const [user, setUser] = useState<CreateUserProps>({ name: '', email: '', password: '', bio: '', contact: '', soMe: '', imgUrl: '', cvUrl: '' })

   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createUserAsync({
         name: user.name,
         email: user.email,
         password: user.password,
         bio: user.bio,
         contact: user.contact,
         soMe: user.soMe,
         imgUrl: user.imgUrl,
         cvUrl: user.cvUrl
      });
   }

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }
   return <>
      <Container maxWidth='sm'>
         <h1>Create User</h1>
         <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className='form-input-container'>
               <label htmlFor='name'>Full name <AutoAwesome color='success' fontSize="small" /></label>
               <input value={user.name} onChange={handleChange} id='name' name='name' type='text' />
            </div>
            <div className='form-input-container'>
               <label htmlFor="email">Email address <AutoAwesome color='success' fontSize="small" /></label>
               <input value={user.email} onChange={handleChange} id='email' name='email' type='email' />
            </div>
            <div className='form-input-container'>
               <label htmlFor="password">Password <AutoAwesome color='success' fontSize="small" /></label>
               <input value={user.password} onChange={handleChange} id='password' name='password' type='password' />
            </div>
            <div className='form-input-container'>
               <label htmlFor="confirmPassword">Confirm password <AutoAwesome color='success' fontSize="small" /></label>
               <input id='confirmedPassword' name='confirmPassword' type='password' />
            </div>
            <div style={{ padding: 10, borderRadius: 4, backgroundColor: 'rgba(80,186,147,1)', display: 'flex', flexDirection: 'column', gap: 10 }}>
               <p style={{ paddingBottom: 15 }}>This section is information that other users will be able to see on your profile page when they are logged in. These fields are not required, but will improve your chances of finding a match. You can update your profile with this information later, if you prefer.</p>
               <div>
                  <label htmlFor="bio"><p>Tell us about yourself!</p></label>
                  <textarea value={user.bio} onChange={handleChange} id='bio' name='bio' style={{width: '100%'}}/>
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
            <button>Submit</button>
         </form>
      </Container>
   </>
}