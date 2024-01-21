import React from 'react';
import { Container, Card, CardHeader, CardContent, CardMedia, CardActions, Typography, Button, Divider, Grid, Box } from "@mui/material";

export type PitchPageProps = {
  title: string;
  category: string;
  creator: string;
  goals: string;
  investors: number;
  funding: string;
  risk: number;
  projectedYield: string;
  description: string;
  imageUrl: string;
};

export function PitchPageComponent(props: PitchPageProps) {
    return (
        <Container maxWidth="sm">
          <Card sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="140"
              image={props.imageUrl}
              alt="Background"
              sx={{ opacity: 0.5 }}
            />
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: 2 }}>
              <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                {props.title}
              </Typography>
              <Typography variant="body2" color="primary.contrastText">
                {props.category}
              </Typography>
              <CardActions>
                <Button variant="contained" color="secondary">
                  Interested
                </Button>
              </CardActions>
              <Divider sx={{ bgcolor: 'primary.contrastText' }} />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Creator:</Typography>
                    <Typography>{props.creator}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Goals:</Typography>
                    <Typography>{props.goals}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Investors:</Typography>
                    <Typography>{props.investors}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Funding:</Typography>
                    <Typography>{props.funding}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Risk:</Typography>
                    <Typography>{props.risk}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Projected Annual Yield:</Typography>
                    <Typography>{props.projectedYield}</Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  {props.description}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Container>
      );
    }


export const style1 = {
  margin: "0 35px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
