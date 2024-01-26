import { Container, Card, CardHeader, Divider, CardContent, Button, TextField, InputAdornment, IconButton, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { style2 } from "./CreateUserCard";
import { Visibility, VisibilityOff } from "@mui/icons-material";
type LogInType = {
  email: string;
  password: string;
  passwordVisibility: boolean;
  onChangeEmail: React.Dispatch<React.SetStateAction<string>>
  onChangePassword: React.Dispatch<React.SetStateAction<string>>
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  onTogglePasswordVisibility: () => void;
}

export function LogInCard({ email, password, onChangeEmail, onChangePassword, passwordVisibility, onSubmit, onTogglePasswordVisibility }: LogInType) {


  return <>
    <Container maxWidth='md' sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', textAlign: 'center' }}>
      <Paper elevation={3} style={{ marginBottom: 15 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
          <h2>Log in</h2>
        </div>
        <CardContent style={{
          borderTop: 'solid',
          borderWidth: 1,
          borderColor: 'rgba(26, 125, 127, 0.564)',
        }}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={e => onChangeEmail(e.target.value)}
            fullWidth
          />
          <TextField
            type={passwordVisibility ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => onChangePassword(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => onTogglePasswordVisibility()}>
                    {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div style={{display: 'flex', flexDirection: 'column'}}>
          <Link to="/forgottenPassword">Forgot you password?</Link>
          <Button onClick={onSubmit} variant="contained" color="success" sx={{marginTop: 2, marginLeft: 2, marginRight: 2, "&:focus": { outline: "none", } }}>
            Log in
          </Button>
          </div>
        </CardContent>
      </Paper>
    </Container>
  </>
}

export const style3 = {
  margin: "35px",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};