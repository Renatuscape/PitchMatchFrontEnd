import React, { useEffect, useState } from 'react';
import { Container, Card, CardHeader, CardContent, CardMedia, CardActions, Typography, Button, Divider, Grid, Box, LinearProgress } from "@mui/material";
import { Pitch } from './types';

export type PitchPageProps = {
  title: string;
  category: string;
  creator: string;
  goals: number;
  investors: number;
  funding: number;
  risk: number;
  projectedYield: string;
  description: string;
  imageUrl: string;
};

export function PitchPageComponent(props: PitchPageProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      return (props.funding / props.goals) * 100;
    };

    setProgress(calculateProgress());
  }, [props.funding, props.goals]);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Card sx={{
          maxWidth: 'lg',
          mx: 'auto',
          my: 4,
          boxShadow: 3,
          position: 'relative',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <CardMedia
            component="img"
            height="194"
            image={props.imageUrl}
            alt="Success"
          />
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <Typography gutterBottom variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
              {props.title}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
              {props.category}
            </Typography>
            <Button variant="contained" color="secondary" size="large" sx={{ alignSelf: 'flex-end' }}>
              Interested
            </Button>
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
                  <Typography>{props.creator}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Goals:</Typography>
                  <Typography>{props.goals}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Investors:</Typography>
                  <Typography>{props.investors}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Funding:</Typography>
                  <Typography>{props.funding}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Risk:</Typography>
                  <Typography>{props.risk}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Projected Annual Yield:</Typography>
                  <Typography>{props.projectedYield}</Typography>
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
