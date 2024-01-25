import { Container, Card, CardHeader, Divider, CardContent, Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { style2 } from "./CreateUserCard";
import { Visibility, VisibilityOff } from "@mui/icons-material";
type LogInType={
    email: string;
    password: string;
    passwordVisibility: boolean;
    onChangeEmail:React.Dispatch<React.SetStateAction<string>>
    onChangePassword:React.Dispatch<React.SetStateAction<string>>
    onSubmit:(e:React.MouseEvent<HTMLButtonElement>)=>void
    onTogglePasswordVisibility: () => void;
  }
  
export function LogInCard({email,password,onChangeEmail,onChangePassword,passwordVisibility, onSubmit,onTogglePasswordVisibility}:LogInType){


    return <>
    <Container>
            <Card sx={style3}>
                <CardHeader title="Log in" />
                <Divider orientation="horizontal" />
                <CardContent>
                    <p>Log in to your account</p>
                     <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={e=>onChangeEmail(e.target.value)}
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
                    <Link to="/forgottenPassword">Forgot you password?</Link>
                        <Button onClick={onSubmit} variant="contained" color="success" sx={{ margin: '0 20px', "&:focus":{outline: "none",}  }}>
                            Log in
                        </Button>
                </CardContent>
            </Card>
        </Container>
    </>
}

export const style3 = {
    margin: "35px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};