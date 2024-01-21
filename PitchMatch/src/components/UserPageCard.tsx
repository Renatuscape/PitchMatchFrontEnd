import { Container, Card, Box, CardHeader, Button, Divider, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PitchCard } from "./PitchCard";
import { UserPageProps } from "../pages/UserPage";

export function UserPageCardTop({name,contact,soMe,cv,isLogged}: UserPageProps){

    return<>
     <Container>
            <Card sx={style1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardHeader title="About me" />
                    {isLogged && 
                    <Link to="/edituser">
                        <Button variant="contained" color="success" sx={{ margin: '0 20px' }}>
                            Edit
                        </Button>
                    </Link>
                }
                </Box>
                <Divider orientation="horizontal" sx={{}} flexItem />
                <CardContent style={{ display: 'flex', justifyContent: 'space-between',alignItems:'flex-end' }}>
                    <Grid container>
                        {/* Image taking 60% of the space */}
                        <Grid item xs={6} sx={{display: 'flex', alignItems:'flex-end'}}>
                            <img src="https://picsum.photos/400/200" alt="profile" style={{ borderRadius:"5px" }} />
                        </Grid>
                        {/* Label for name */}
                       <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between',alignItems:'center' }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                Full name
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Contact
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                CV
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Add me
                            </Typography>
                        </Grid>
                        {/* Name itself */}
                           <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between',alignItems:'center' }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                {name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {contact}
                            </Typography>
                        <Button variant="contained" href={cv}color="success" sx={{ margin: '0 20px' , "&:focus":{outline: "none",}}}>
                            Click Me!
                        </Button>
                            <Button variant="contained" href={soMe} color="success" sx={{margin: '0 20px' , "&:focus":{outline: "none",}}}>
                            SocialMedia
                        </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        </>
}
export function UserPageCardMiddle({ bio }: UserPageProps){ 
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

export function UserPageCardBottom({ portfolio }: UserPageProps){
   
return<>
 <Container>
            <Card sx={style3}>
                <CardHeader title="Portfolio" />
                <Divider orientation="horizontal" sx={{}} flexItem />
                <CardContent>
                   {portfolio ? (
  portfolio.map((pitch: Pitch) => {
    return <PitchCard title={pitch.title} content={pitch.description} />;
  })
) : (
  <PitchCard title="No pitches yet" content="You have no pitches yet. Create one now!" />
)}
              
                </CardContent>
            </Card>
        </Container>
</>
}

const style1 = {
    margin: "5px 35px",
    height: "310px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
const style2 = {
    margin: "35px",
    height: "200px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
const style3 = {
    margin: "0 35px 15px",
    height: "450px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};