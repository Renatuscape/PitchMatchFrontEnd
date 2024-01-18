import { Container, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar(){
    return<>
    <Container style={{marginTop:"15px"}}>
        <Paper elevation={3} style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
            <TextField
                fullWidth
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