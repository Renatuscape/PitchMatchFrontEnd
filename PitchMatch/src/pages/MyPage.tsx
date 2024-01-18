import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function MyPage(){
    return (
        <Container>
            <Card sx={styles}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardHeader title="About me" />
                    <Link to="/edituser">
                        <Button variant="contained" color="success" sx={{ margin: '0 20px' }}>
                            Edit
                        </Button>
                    </Link>
                </Box>
                <Divider orientation="horizontal" sx={{}} flexItem />
               <CardContent>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={6} >
                        <img src="https://picsum.photos/200/300" alt="profile" style={{width:"60%", height:"80%"}} />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" color="text.secondary">
                                 Full name
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Column 3
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}
const styles = {
    margin: "20px",
    height: "400px",
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};

