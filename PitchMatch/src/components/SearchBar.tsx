import { Container, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

type User = {
    id: number;
    name: string;
    contact: string;
    soMe: string;
    imgUrl: string;
    bio: string;
    location: string;
}
export function SearchBar(){
     const [input, setInput] = useState("");

  const fetchData = (value:any) => {
    fetch("https://pitchmatch.azurewebsites.net/User")
      .then((response) => response.json())
    //   .then((json) => {
    //     // const results = json.filter((user:User) => {
    //       return (
    //         value && user && user.name && user.name.toLowerCase().includes(value)
    //       );
    //     });
    //     // setResults(results);
    //   });
  };

// const handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
// setInput(value);
// fetchData(value);
// };
  
    return<>
    <Container style={{marginTop:"15px"}}>
        <Paper elevation={3} style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
            <TextField
                fullWidth
                value={input}
                // onChange={(e) => handleChange(e.target.value)}
                variant="outlined"
                placeholder="Search..."
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Paper>
        </Container>
    </>
}
