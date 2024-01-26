import { Container, Card, CardHeader, Divider, CardContent, Button, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export function CreateUserCard() {
    const navigate = useNavigate();
    const handler = () => {
        navigate("/createuser");
    }

    return <>
    <Container maxWidth='md' sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', textAlign: 'center' }}>
      <Paper elevation={3} style={{ marginBottom: 15 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
          <h2>Create account</h2>
        </div>
        <CardContent style={{
          borderTop: 'solid',
          borderWidth: 1,
          borderColor: 'rgba(26, 125, 127, 0.564)',
        }}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Button variant="contained" color="success" onClick={handler} sx={{ margin: '0 20px', "&:focus":{outline: "none",} }}>
                            Create User
                        </Button>
                        </div>
                </CardContent>
            </Paper>
        </Container>
     </>
 }
export const style2 = {
    margin: "35px",
    height: "200px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};