import { Container, Card, CardHeader, Divider, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";

export function CreateUserCard() {
    return <>
     <Container>
            <Card sx={style2}>
                <CardHeader title="Create your user" />
                <Divider orientation="horizontal" />
                <CardContent>
                    <Link to="/createuser">
                        <Button variant="contained" color="success" sx={{ margin: '0 20px', "&:focus":{outline: "none",} }}>
                            Create User
                        </Button>
                    </Link>
                    
                </CardContent>
            </Card>
        </Container>
     </>
 }
export const style2 = {
    margin: "35px",
    height: "200px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};