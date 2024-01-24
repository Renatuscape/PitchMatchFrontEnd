import { useEffect, useState } from "react";
import { PitchCard, PitchCardProps } from "../components/PitchCard";
import { Pitch } from "../components/types";
import { Link } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { useAuth } from "../App";
import { DynamicCard } from "../components/DynamicCard";


export function Home() {
  const { token } = useAuth();
  const isLoggedIn: boolean = !!token?.accessToken;
  const userId: number = token?.userId ?? 0;
  const [pitches, setPitches] = useState<Pitch[]>([])


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

  return <div className="page-background" style={{ height: 'auto', display: 'flex' }}>
    <div className="home-picture" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ display: 'flex', gap: 50, justifyContent: 'space-evenly', marginTop: 75, marginBottom: '20vw'}}>
        <div className="goal-float">2,300<p>Projects funded</p></div>
        <div className="goal-float" id="goal-float-main">4 MIL<p>In annual yields</p></div>
        <div className="goal-float">6,500<p>Local jobs created</p></div>
      </div>
      <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
      <Box style={{display: 'grid', gap: 20, paddingBottom: 30, gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto' }}>
        {pitches.map((pitch, index) => (
          isLoggedIn ? (
            <Link key={index + pitch.id} to={`/pitch/${pitch.id}`} style={{ textDecoration: 'none' }}>
              <DynamicCard key={index + pitch.id} pitch={pitch} />
            </Link>

          ) : (
            <Link key={index + pitch.id} to="/login" style={{ textDecoration: 'none' }}>
              <DynamicCard key={index + pitch.id} pitch={pitch} />
            </Link>
          )
        ))}
      </Box>
      </div>
    </div>
  </div>
}

export async function getPitchesAsync(): Promise<Pitch[]> {
  const res = await fetch("https://pitchmatch.azurewebsites.net/Home")
  const resObject = await res.json();
  return resObject;
}