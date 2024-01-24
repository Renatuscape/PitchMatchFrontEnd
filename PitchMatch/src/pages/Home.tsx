import { useEffect, useState } from "react";
import { PitchCard, PitchCardProps } from "../components/PitchCard";
import { Pitch } from "../components/types";
import { Link } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { useAuth } from "../App";


export function Home(){
  const{token}=useAuth();
  const isLoggedIn: boolean = !!token?.accessToken;
  const userId: number = token?.userId ?? 0;
    const[pitches,setPitches]=useState<Pitch[]>([])
   

   useEffect(() => {
    const fetchData = async () => {
      try {
        const pitchesData = await getPitchesAsync();
        setPitches(pitchesData);
      } catch (error) {
        console.error("Error fetching pitches:", error);
      }
    };

    fetchData();
  }, []);

    return <div className="page-background" style={{minHeight:'75vh'}}>
        <div className="home-picture">
            <div className="goal-float">2,300<p>Projects funded</p></div>
            <div className="goal-float" id="goal-float-main">4 MIL<p>In annual yields</p></div>
            <div className="goal-float">6,500<p>Local jobs created</p></div>
        </div>
        <Box style={{width: '100vw', marginLeft: '55px',display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto'}}>
            {pitches.map((pitch, index) => (
  isLoggedIn ? (
    <Link to={`/pitch/${pitch.Id}`} style={{ textDecoration: 'none' }}>
      <PitchCard key={index} title={pitch.title} content={pitch.summary} imgUrl={pitch.imgUrl}/>
    </Link>
    
  ) : (
    <Link to="/login" style={{ textDecoration: 'none' }}>
      <PitchCard key={index} title={pitch.title} content={pitch.summary} imgUrl={pitch.imgUrl}/>
    </Link>
  )
))}
        </Box>
    </div>
}

export async function getPitchesAsync():Promise<Pitch[]>{
   const res = await fetch("https://pitchmatch.azurewebsites.net/Home")
   const resObject = await res.json();
   return resObject;
}