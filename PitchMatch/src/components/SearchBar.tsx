import { Container, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { PitchCard } from "./PitchCard";
import { UserSearchCard } from "./UserSearchCard";
import { Link } from "react-router-dom";
import { DynamicCard } from "./DynamicCard";
import { User } from "./types";


type PitchSearchProps = {
  id: number;
  title: string;
  content: string;
  imgUrl: string;
}

export function SearchBar() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [pitchers, setPitchers] = useState<PitchSearchProps[]>([]);
  const [filteredPitchers, setFilteredPitchers] = useState<PitchSearchProps[]>([]);


  useEffect(() => {
    getAllUsersAsync().then(user => {
      setUsers(user);
      setFilteredUsers(user);
    });

    getAllPitchesAsync().then(pitch => {
      setPitchers(pitch);
      setFilteredPitchers(pitch);
    });
  }, []);

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
  return <>
    <div className='page-background'>
      <Container style={{ alignItems: 'center' }}>
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
                </InputAdornment>),
            }} />
        </Paper>

        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto', textAlign: 'center', marginTop: '15p' }}>
          {filteredUsers.map((user: User) => (
            <Link key={user.id} to={`/user/${user.id}`}>
              <DynamicCard key={user.id} user={user} />
              {/* <UserSearchCard key={user.id} id={user.id} name={user.name} email={user.email} location={user.location} imgUrl={user.imgUrl} /> */}
            </Link>
          ))}

          {filteredPitchers.map((pitch: PitchSearchProps) => (
            <Link key={pitch.id} to={`/pitch/${pitch.id}`}>
              <DynamicCard key={pitch.id} pitch={pitch} />
              {/* <PitchCard key={pitch.id} title={pitch.title} content={pitch.content} imgUrl={pitch.imgUrl}/> */}
            </Link>
          ))}

        </div>
      </Container>
    </div>
  </>
}

export async function getAllUsersAsync(): Promise<User[]> {
  const res = await fetch("https://pitchmatch.azurewebsites.net/user")
  const resObject = await res.json();
  return resObject;
}
export async function getAllPitchesAsync(): Promise<PitchSearchProps[]> {
  const res = await fetch("https://pitchmatch.azurewebsites.net/pitch")
  const resObject = await res.json();
  return resObject;
}