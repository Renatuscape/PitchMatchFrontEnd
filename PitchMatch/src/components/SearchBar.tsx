import { Container, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { PitchCard } from "./PitchCard";

type UserSearchProps={
    id: string;
    name: string;
    email: string;
    location: string;
    profilePictureUrl: string;
  }
type PitchSearchProps={
    id: string;
    title: string;
    content: string;
    imgUrl: string;
}

export function SearchBar(){
     const[users,setUsers]=useState<UserSearchProps[]>([]);
     const[filteredUsers,setFilteredUsers]=useState<UserSearchProps[]>([]);
     const[pitchers,setPitchers]=useState<PitchSearchProps[]>([]);
     const[filteredPitchers,setFilteredPitchers]=useState<PitchSearchProps[]>([]);

  
    useEffect(() => {
    getAllUsersAsync().then(user => {
        setUsers(user);
        setFilteredUsers(user);
        });
    },[]);
    useEffect(() => {
    getAllPitchesAsync().then(pitch => {
        setPitchers(pitch);
        setFilteredPitchers(pitch);
        });
    },[]);
    

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const filteredUsers = users.filter(user => {
      return user.name.toLowerCase().includes(inputValue.toLowerCase());
    });

    setFilteredUsers(filteredUsers);
  };
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
                {filteredUsers.map((user:UserSearchProps) =>  <UserSearchComp key={user.id} {...user} />)}
            </div>
            <div>
                {filteredPitchers.map((pitch:PitchSearchProps) =>  <PitchCard key={pitch.id} {...pitch} />)}
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

export async function getAllUsersAsync():Promise<UserSearchProps[]>{
const res = await fetch("https://pitchmatch.azurewebsites.net/user")
const resObject = await res.json();
return resObject;
}
export async function getAllPitchesAsync():Promise<PitchSearchProps[]>{
const res = await fetch("https://pitchmatch.azurewebsites.net/pitch")
const resObject = await res.json();
return resObject;
}