import { Container, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DynamicCard } from "./DynamicCard";
import { Pitch, User } from "./types";

export function SearchBar() {
  const [searchType, setSearchType] = useState<string>("location");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [pitches, setPitchers] = useState<Pitch[]>([]);
  const [filteredPitches, setFilteredPitches] = useState<Pitch[]>([]);

  useEffect(() => {
    getAllUsersAsync().then(users => {
      setUsers(users);
      setFilteredUsers(users);
    });

    getAllPitchesAsync().then(pitches => {
      setPitchers(pitches);
      setFilteredPitches(pitches);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();

    if (searchType === "users") {
      const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(inputValue);
      });
      setFilteredUsers(filteredUsers);
      setFilteredPitches([]);
    } else if (searchType === "pitches") {
      const filteredPitches = pitches.filter(pitch => {
        return pitch.title.toLowerCase().includes(inputValue);
      });
      setFilteredUsers([]);
      setFilteredPitches(filteredPitches);
    }
    else if (searchType === "location") {
      // Implement location search logic here if needed

      setFilteredUsers(filteredUsers);
      setFilteredPitches(filteredPitches);
    }
  };

  const handleSearchTypeChange = (newSearchType: string) => {
    setSearchType(newSearchType);
    if (newSearchType === "location") {
      setFilteredPitches(pitches);
      setFilteredUsers(users);
    }
    else if (newSearchType === "users") {
      setFilteredPitches([]);
      setFilteredUsers(users);
    }
    else if (newSearchType === "pitches") {
      setFilteredPitches(pitches);
      setFilteredUsers([]);
    }
  };

  return <>
    <div className='page-background' style={{ paddingTop: 15, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
      <Container style={{ alignItems: 'center' }}>
        <Paper elevation={3} style={{ display: 'flex', padding: '10px', alignItems: 'center' }}>
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
          <select
            style={{
              width: '20%',
              height: '40px',
              paddingLeft: '15px',
              marginLeft: '10px',
              backgroundColor: 'white',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.35)',
            }}
            onChange={(e) => handleSearchTypeChange(e.target.value)}
          >
            <option value="location">Location</option>
            <option value="users">Users</option>
            <option value="pitches">Pitches</option>
          </select>
        </Paper>

        <div style={{ paddingTop: 20, paddingBottom: 20, display: 'grid', gap: 20, gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto', textAlign: 'center', marginTop: '15p' }}>
          {filteredUsers.map((user: User) => (
            <Link key={user.id} to={`/user/${user.id}`}>
              <DynamicCard key={user.id} user={user} />
            </Link>
          ))}

          {filteredPitches.map((pitch: Pitch) => (
            <Link key={pitch.Id} to={`/pitch/${pitch.Id}`}>
              <DynamicCard key={pitch.Id} pitch={pitch} />
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
export async function getAllPitchesAsync(): Promise<Pitch[]> {
  const res = await fetch("https://pitchmatch.azurewebsites.net/pitch")
  const resObject = await res.json();
  return resObject;
}
