import { Container, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DynamicCard } from "./DynamicCard";
import { Pitch, User } from "./types";
import { GetCoordinates, sortPitchesByDistance, sortUsersByDistance } from "./GeoTools";

export function SearchBar() {
  const [searchType, setSearchType] = useState<string>("pitches");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [pitches, setPitchers] = useState<Pitch[]>([]);
  const [filteredPitches, setFilteredPitches] = useState<Pitch[]>([]);
  const [coordinates, setCoordinates] = useState<{ latitude: number, longitude: number }>({ latitude: 0, longitude: 0 });

  useEffect(() => {
    getAllUsersAsync().then(users => {
      setUsers(users);
      setFilteredUsers([]);
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
    }

    else if (searchType === "pitches") {
      const filteredPitches = pitches.filter(pitch => {
        return pitch.title.toLowerCase().includes(inputValue);
      });
      setFilteredUsers([]);
      setFilteredPitches(filteredPitches);
    }

    else if (searchType === "userLocation" && inputValue !== "") {

      GetCoordinates(inputValue).then((coordinates) => {
        const sortedUsers = sortUsersByDistance(users, coordinates.latitude, coordinates.longitude);

        if (coordinates.latitude === 0 && coordinates.longitude === 0) {
          setFilteredUsers([]);
        }
        else {
          setFilteredUsers(sortedUsers);
        }
        setFilteredPitches([]);
        setCoordinates({ latitude: coordinates.latitude, longitude: coordinates.longitude });
      });
    }

    else if (searchType === "pitchLocation" && inputValue !== "") {
      GetCoordinates(inputValue).then((coordinates) => {
        const sortedPitches = sortPitchesByDistance(pitches, coordinates.latitude, coordinates.longitude);

        if (coordinates.latitude === 0 && coordinates.longitude === 0) {
          setFilteredPitches([]);
        }
        else {
          setFilteredPitches(sortedPitches);
        }
        setFilteredUsers([]);
        setCoordinates({ latitude: coordinates.latitude, longitude: coordinates.longitude });
      });
    }
  };

  const handleSearchTypeChange = (newSearchType: string) => {
    setSearchType(newSearchType);
    if (newSearchType === "userLocation") {
      setFilteredPitches([]);
      setFilteredUsers(users);
    }
    else if (newSearchType === "pitchLocation") {
      setFilteredPitches(pitches);
      setFilteredUsers([]);
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
            <option value="pitches">Pitches</option>
            <option value="users">Users</option>
            <option value="pitchLocation">Pitches by location</option>
            <option value="userLocation">Users by location</option>
          </select>
        </Paper>
        <p>Search coordinates: {coordinates.latitude} - {coordinates.longitude}</p>
        <div style={{ paddingTop: 20, paddingBottom: 20, display: 'grid', gap: 20, gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto', textAlign: 'center', marginTop: '15p' }}>
          {filteredUsers.map((user: User) => (
            <Link key={user.id + user.name} to={`/user/${user.id}`}>
              <DynamicCard key={user.id + user.name} user={user} />
            </Link>
          ))}

          {filteredPitches.map((pitch: Pitch) => (
            <Link key={pitch.id + pitch.title} to={`/pitch/${pitch.id}`}>
              <DynamicCard key={pitch.id + pitch.title} pitch={pitch} />
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
