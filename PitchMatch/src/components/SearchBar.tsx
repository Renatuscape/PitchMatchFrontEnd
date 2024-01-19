import { Container, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { PitchCard } from "./PitchCard";
import { UserSearchCard } from "./UserSearchCard";
import { Link } from "react-router-dom";

export type UserSearchProps={
    id: number;
    name: string;
    email: string;
    location: string;
    profilePictureUrl: string;
}
type PitchSearchProps={
    id: number;
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
    const filteredPitchers = pitchers.filter(pitch => {
        return pitch.title.toLowerCase().includes(inputValue.toLowerCase());
      });
    setFilteredPitchers(filteredPitchers);
  };
    return<>
    <Container style={{marginTop:"15px", alignItems:'center'}}>
        <Paper elevation={3} style={{ padding: '10px', alignItems: 'center' }}>
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
        
            <div style={{display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto', textAlign: 'center', marginTop:'15px'}}>
                
                {filteredUsers.map((user:UserSearchProps) =>  <Link to={`/user/${user.id}`}> <UserSearchCard key={user.id} {...user} /></Link>)}
                
                
                {filteredPitchers.map((pitch:PitchSearchProps) =>  <Link to={`/pitch/${pitch.id}`}><PitchCard key={pitch.id} {...pitch} /></Link>)}
                
            </div>
        </Container>
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