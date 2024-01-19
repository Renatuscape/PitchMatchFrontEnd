import { Container, Card, Box, CardHeader, Button, Divider, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PitchCard } from "./PitchCard";

// type UserPageCard1Props = {
//     name: string;
//     contact: string;
//     soMe: string;
//     imgUrl: string;
//     bio: string;
// }

export function UserPageCard1(){
    return<>
     <Container>
            <Card sx={style1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardHeader title="About me" />
                    <Link to="/edituser">
                        <Button variant="contained" color="success" sx={{ margin: '0 20px' }}>
                            Edit
                        </Button>
                    </Link>
                </Box>
                <Divider orientation="horizontal" sx={{}} flexItem />
                <CardContent sx={{justifyContent:"space-between", alignItems:"center"}}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        {/* Image taking 60% of the space */}
                        <Grid item xs={6} >
                            <img src="https://picsum.photos/400/200" alt="profile" style={{ alignItems:"center", borderRadius:"15px" }} />
                        </Grid>
                        {/* Label for name */}
                       <Grid item xs={2} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column',rowGap:"25px" }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                Full name
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Contact
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Add me
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                CV
                            </Typography>
                        </Grid>
                        {/* Name itself */}
                           <Grid item xs={2} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', rowGap:"25px" }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                John Doe 
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                user email
                            </Typography>
                            <Button variant="contained" color="success" sx={{ margin: '0 20px' }}>
                            SocialMedia
                        </Button>
                        <Button variant="contained" color="success" sx={{ margin: '0 20px' }}>
                            Click Me!
                        </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        </>
}
const style1 = {
    margin: "35px",
    height: "400px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
export function UserPageCard2(){
return<>
 <Container>
            <Card sx={style2}>
                <CardHeader title="Bio" />
                <Divider orientation="horizontal" sx={{}} flexItem />
                <CardContent>
                    <Typography variant="body1" color="text.primary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        Suspendisse aliquam urna sit amet facilisis feugiat. 
                        Quisque in lorem euismod, accumsan odio at, feugiat nulla.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Suspendisse aliquam urna sit amet facilisis feugiat. 
                        Quisque in lorem euismod, accumsan odio at, feugiat nulla.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Suspendisse aliquam urna sit amet facilisis feugiat. 
                        Quisque in lorem euismod, accumsan odio at, feugiat nulla.
                    </Typography>
                </CardContent>
            </Card>
        </Container>
</>
}
const style2 = {
    margin: "35px",
    height: "200px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
export function UserPageCard3(){
return<>
 <Container>
            <Card sx={style2}>
                <CardHeader title="Portfolio" />
                <Divider orientation="horizontal" sx={{}} flexItem />
                <CardContent>
                    <PitchCard title={"Paint and Sip"} content={"Painting with friends and wine"} />
                    <PitchCard title={"Empanadas Shop"} content={"Beste argentisnke empanadas"} />
                    <PitchCard title={"WebApp SharkTank"} content={"A matchmaker between investors and dreamers"} />
                </CardContent>
            </Card>
        </Container>
</>
}
export function UserPageCard4(){
    return<>
     <Container>
            <Card sx={style1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardHeader title="About me" />
                </Box>
                <Divider orientation="horizontal" sx={{}} flexItem />
                <CardContent sx={{justifyContent:"space-between", alignItems:"center"}}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        {/* Image taking 60% of the space */}
                        <Grid item xs={6} >
                            <img src="https://picsum.photos/400/200" alt="profile" style={{ alignItems:"center", borderRadius:"15px" }} />
                        </Grid>
                        {/* Label for name */}
                       <Grid item xs={2} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column',rowGap:"25px" }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                Full name
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Contact
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Add me
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                CV
                            </Typography>
                        </Grid>
                        {/* Name itself */}
                           <Grid item xs={2} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', rowGap:"25px" }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                John Doe 
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                user email
                            </Typography>
                            <Button variant="contained" color="success" sx={{ margin: '0 20px' }}>
                            SocialMedia
                        </Button>
                        <Button variant="contained" color="success" sx={{ margin: '0 20px' }}>
                            Click Me!
                        </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        </>
}