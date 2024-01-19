import { Container, Card, CardHeader, Divider, CardContent, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { style2 } from "./CreateUserCard";


export function LogInCard(){
    return <>
    <Container>
            <Card sx={style3}>
                <CardHeader title="Log in" />
                <Divider orientation="horizontal" />
                <CardContent>
                    <p>Log in to your account</p>
                     <TextField
                  name="summary"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                 
              
                />
                <TextField
                  name="summary"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
                    <Link to="/forgottenPassword">Forgot you password?</Link>
                    <Link to="/mypage">
                        <Button variant="contained" color="success" sx={{ margin: '0 20px' }}>
                            Log in
                        </Button>
                    </Link>
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