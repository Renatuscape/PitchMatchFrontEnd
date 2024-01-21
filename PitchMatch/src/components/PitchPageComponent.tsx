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
            height="140"
            image={props.imageUrl}
            alt="Background"
            sx={{ width: '100%', height: 'auto', opacity: 0.5 }}
          />
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography gutterBottom variant="h3" component="div" color="primary.contrastText" sx={{ fontWeight: 'bold' }}>
              {props.title}
            </Typography>
            <Typography variant="h6" color="primary.contrastText" sx={{ mb: 2 }}>
              {props.category}
            </Typography>
            <Button variant="contained" color="secondary" size="large">
              Interested
            </Button>
            <Divider sx={{ bgcolor: 'primary.contrastText', my: 2 }} />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Creator:</Typography>
                  <Typography>{props.creator}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Goals:</Typography>
                  <Typography>{props.goals}</Typography>
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
