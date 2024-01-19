import { Container, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

type UserSearchProps={
    id: string;
    name: string;
    email: string;
    location: string;
    profilePictureUrl: string;
  }

export function SearchBar(){
     const[users,setUsers]=useState<UserSearchProps[]>([]);
  
    useEffect(() => {
    getAllUsersAsync()
      .then(user => setUsers(user))
    }, []);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        const filteredUsers = users.filter((user) => {
            return user.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setUsers(filteredUsers);
    }
    return<>
    <Container style={{marginTop:"15px"}}>
        <Paper elevation={3} style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
            <TextField
                fullWidth
                onChange={handleSearch}
                variant="outlined"
                placeholder="Search..."
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>),}}/>
        </Paper>
            <div>
                {users.map((user:UserSearchProps) =>  <UserSearchComp key={user.id} {...user} />)}
            </div>
        </Container>
    </>
}

export function UserSearchComp(user:UserSearchProps){
return<>
<div key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <p>{user.location}</p>
                        <img src={user.profilePictureUrl} alt="profile picture" />
                    </div>
</>
}

export async function getAllUsersAsync(){
const res = await fetch("https://pitchmatch.azurewebsites.net/user")
const resObject = await res.json();
return resObject;
}