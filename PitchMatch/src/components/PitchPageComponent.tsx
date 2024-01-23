import React, { useEffect, useState } from 'react';
import { Container, Card, CardHeader, CardContent, CardMedia, CardActions, Typography, Button, Divider, Grid, Box, LinearProgress } from "@mui/material";
import { Pitch } from './types';

export type PitchPageProps = {
  id: number;
  title: string;
  summary: string;
  description: string;
  imgUrl: string;
  location: string;
  goal: number;
  funding: number;
  yield: number;
  views: number;
  categories: string;
  userId: number;
  user: null | any; 
  investments: null | any;  
};


export function PitchPageComponent(props: PitchPageProps) {
  console.log("PitchPageComponent props:", props); 

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      return (props.funding / props.goal) * 100;
    };

    setProgress(calculateProgress());
  }, [props.funding, props.goal]);
  

  // const updateViewCount = async () => {
  //   try {
  //     const [views, setViews] = useState(0);
  //     const newViews = views + 1; // Increment the current view count by 1
  //     const response = await fetch(`https://pitchmatch.azurewebsites.net/Pitch/${props.id}?pitchId=${props.id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Include other headers like authorization if needed
  //       },
  //       body: JSON.stringify({ views: newViews }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     // Assuming the response includes the updated pitch with the new views count
  //     const updatedPitch = await response.json();
      
  //     // Update the view count state if the API call was successful
  //     setViews(updatedPitch.views);
  
  //   } catch (error) {
  //     console.error('Failed to update view count:', error);
  //   }
  // };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', }}>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Card sx={{
          maxWidth: 'lg',
          mx: 'auto',
          my: 4,
          boxShadow: 3,
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <Box sx={{
            // position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <Box sx={{
              backgroundImage: `url(${props.imgUrl})`,
              backgroundPosition: 'center',
              backgroundSize: '100%, auto',
              backgroundRepeat: 'no-repeat',
              height: 400,
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'column',
              padding: '1.5em',
            }}>
              <Box sx={{ pt: 4 }}>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  sx={{ fontWeight: 'bold', color: 'black', mt: 2 }}
                >
                  {props.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: 'black' }}
                >
                  {props.categories}
                </Typography>
              </Box>

              <Button variant="contained" color="secondary" size="large" sx={{ mb: 2, mr: 2, alignSelf: 'flex-end' }}>
                Interested
              </Button>

            </Box>
            {/* <CardMedia
            component="img"
            height="194"
            image={props.imgUrl}
            alt="Success"
            sx={{ height: 388, objectFit: 'cover' }} 
            /> */}
            <Divider sx={{ bgcolor: 'white', my: 2 }} />
            <CardContent sx={{ bgcolor: 'white', opacity: 0.95 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${Math.round(
                    progress,
                  )}%`}</Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Creator:</Typography>
                  <Typography>{props.user}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Goals:</Typography>
                  <Typography>{props.goal}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Investors:</Typography>
                  <Typography>{props.investments}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Funding:</Typography>
                  <Typography>{props.funding}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Risk:</Typography>
                  <Typography>{ }</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Projected Annual Yield:</Typography>
                  <Typography>{props.yield}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ bgcolor: 'white', my: 2 }} />
            <Card sx={style1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardContent sx={{ bgcolor: 'white', opacity: 0.95 }}>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {props.description}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

const style1 = {
  margin: "0 35px",
  height: "400px",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
