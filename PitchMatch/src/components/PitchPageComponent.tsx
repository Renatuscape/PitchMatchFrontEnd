import React, { useEffect, useState } from 'react';
import { Container, Card, CardHeader, CardContent, CardMedia, CardActions, Typography, Button, Divider, Grid, Box, LinearProgress, Link, Paper } from "@mui/material";
import { Pitch } from './types';
import { useAuth } from '../App';
import { DeletePitchButton } from './DeletePitchComponent';
import { Navigate, useNavigate } from 'react-router-dom';

export type Investment = {
  Id: number;
  Amount: number;
  PitchId?: number;
  UserId?: number;
};

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
  investments: Investment[];
};


export function PitchPageComponent(props: PitchPageProps) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const loggedInUserId = useAuth().token?.userId;
  const isOwner = loggedInUserId === props.userId;
  const [hasClickedInterested, setHasClickedInterested] = useState(false);
  const [progress, setProgress] = useState(0);
  const [funding, setFunding] = useState(props.funding);


  console.log("PitchPageComponent props:", props);


  useEffect(() => {
    const calculateProgress = () => {
      return (props.funding / props.goal) * 100;
    };

    setProgress(calculateProgress());
  }, [props.funding, props.goal]);

  const editHandler = () => {
    return <Navigate to={`/editpitch/${token?.userId}`} />
  }

  const uniqueInvestorCount = props.investments ? new Set(props.investments.map(inv => inv.UserId)).size : 0;

  const [investorCount, setInvestorCount] = useState(uniqueInvestorCount);

  const handleInterestClick = async () => {
    if (!hasClickedInterested) {
      setHasClickedInterested(true);

      const randomFundingContribution = Math.random() * (props.goal - props.funding);

      const newInvestment = {
        Amount: randomFundingContribution,
        PitchId: props.id,
        UserId: loggedInUserId,
      };

      try {
        const investmentResponse = await fetch('https://pitchmatch.azurewebsites.net/Investment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.accessToken}`,
          },
          body: JSON.stringify(newInvestment),
        });

        if (!investmentResponse.ok) {
          throw new Error('Failed to create investment');
        }


        const investmentsResponse = await fetch(`https://pitchmatch.azurewebsites.net/Pitch/${props.id}/Investment`);
        if (!investmentsResponse.ok) {
          throw new Error('Failed to fetch investments');
        }
        const investments = await investmentsResponse.json();

        const newUniqueInvestorCount = new Set(investments.map((inv: { UserId: any; }) => inv.UserId)).size;

        setFunding((prevFunding) => prevFunding + randomFundingContribution);
        setInvestorCount(newUniqueInvestorCount);

      } catch (error) {
        console.error('Failed to create investment:', error);
      }
    }
  };

  useEffect(() => {
    const calculateProgress = () => {
      return (funding / props.goal) * 100;
    };

    setProgress(calculateProgress());
  }, [funding, props.goal]);

  const handleEditClick = () => {
    navigate(`/editpitch/${props.id}`);
  };

  return (<>
    <div style={{ minHeight: '80vh', paddingTop: 30, paddingBottom: 30 }}>
      <Container>
        <Paper elevation={4} style={{ overflow: 'hidden' }}>
          <div style={{
            minHeight: '60vh',
            backgroundColor: 'rgb(26,126,127)',
            backgroundImage: `url(${props.imgUrl})`,
            backgroundPosition: 'top',
            backgroundSize: '100%, auto',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
            <div style={{
              backgroundColor: 'rgb(0, 0, 0, 0.3)',
              width: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: 10,
            }}>
              <div style={{
                flexGrow: 1,
                fontSize: '280%',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '1px 1px 5px black',
              }}>
                {props.title}
              </div>
            </div>
          </div>

          <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(26,126,127)' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 35, gap: 10 }}>
              <div style={{ marginLeft: 5, color: 'lightgreen', fontSize: '130%' }}>{props.categories}</div>
              {token && isOwner && <DeletePitchButton id={props.id} />}
              {token && isOwner && (<Button variant="contained" onClick={handleEditClick} color="secondary">Edit</Button>)}
            </div>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleInterestClick}
              disabled={hasClickedInterested} // Disable the button after it's clicked
            >
              Interested
            </Button>
          </div>

          <Paper elevation={3} style={{ width: 'auto', margin: '20px', paddingTop: 5, paddingBottom: 15, textAlign: 'center' }}>
            <div style={{ display: 'flex', padding: 10, gap: 10, alignItems: 'center' }}>
              <div style={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} style={{ height: 10, borderRadius: 10 }} />
              </div>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary" style={{ fontSize: '120%', color: 'rgb(26,126,127)' }}>{`${Math.round(progress)}%`}</Typography>
              </Box>
            </div>
            <p style={{ color: 'rgb(26,126,127)' }}>{props.funding} in investments have been put towards the project goal of {props.goal}</p>
          </Paper>
          <div style={{ minHeight: '10vh' }}>
            <p>Creator: {props.user}</p>
            <p>Investors: {investorCount}</p>
            <p>Risk: {props.funding < props.goal / 2 ? <>High</> : <>Low</>}</p>
            <p>Projected Annual Yield: {props.yield}</p>
          </div>
          <Paper elevation={3} style={{ margin: 20, padding: 15 }}>
            {props.description}
          </Paper>
        </Paper>
      </Container>
    </div>
  </>
  );
}
