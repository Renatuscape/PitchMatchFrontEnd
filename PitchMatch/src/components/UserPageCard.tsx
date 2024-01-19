import { Container, Card, Box, CardHeader, Button, Divider, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PitchCard } from "./PitchCard";
import { UserPageProps } from "../pages/UserPage";


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
    margin: "0 35px",
    height: "400px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
export function UserPageCard2({ bio }: UserPageProps){
    
return<>
 <Container>
            <Card sx={style2}>
                <CardHeader title="Bio" />
                <Divider orientation="horizontal" sx={{}} flexItem />
                <CardContent>
                    <Typography variant="body1" color="text.primary">
                        {bio}
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
export function UserPageCard3({ portfolio }: UserPageProps){
   
return<>
 <Container>
            <Card sx={style2}>
                <CardHeader title="Portfolio" />
                <Divider orientation="horizontal" sx={{}} flexItem />
                <CardContent>
                    {portfolio && portfolio.map((pitch:Pitch) => {
                        return <PitchCard title={pitch.title} content={pitch.description} />;
                    })}
                    
              
                </CardContent>
            </Card>
        </Container>
</>
}
export function UserPageCard4({name,contact,soMe,cv,}: UserPageProps){

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
                       <Grid item xs={2} style={{ display: 'flex', flexDirection: 'column',rowGap:"25px" }}>
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
                                {name}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                {contact}
                            </Typography>
                            <Button variant="contained" href={soMe} color="success" sx={{ margin: '0 20px' , "&:focus":{outline: "none",}}}>
                            SocialMedia
                        </Button>
                        <Button variant="contained" href={cv}color="success" sx={{ margin: '0 20px' , "&:focus":{outline: "none",}}}>
                            Click Me!
                        </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        </>
}