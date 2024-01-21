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
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Card sx={{ maxWidth: 'lg', mx: 'auto', mt: 4, mb: 4, boxShadow: 3, position: 'relative' }}>
          <CardMedia
            component="img"
            image={props.imageUrl}
            alt="Background"
            sx={{ width: '100%', height: 'auto', opacity: 0.5 }}
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
            <Button variant="contained" color="secondary" size="large" sx={{ alignSelf: 'flex-start' }}>
              Interested
            </Button>
            <Divider sx={{ bgcolor: 'white', my: 2 }} />
            <CardContent sx={{ bgcolor: 'white', opacity: 0.95 }}>
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
              <Typography variant="body1" sx={{ mt: 2 }}>
                {props.description}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>
    );
  }



export const style1 = {
  margin: "0 35px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};
