import { useEffect, useState } from "react";
import { PitchCard, PitchCardProps } from "../components/PitchCard";


export function Home(){
    const[pitches,setPitches]=useState<PitchCardProps[]>([])
   

   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://pitchmatch.azurewebsites.net/Home/TopPitches");
        const pitchesData = await res.json();
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
        <div style={{width: '100vw', display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto', textAlign: 'center'}}>
            {pitches.map((pitch, index) => (
            <PitchCard key={index} title={pitch.title} content={pitch.content} imgUrl={pitch.imgUrl}/>
        ))}
        </div>
    </div>
}

export async function getPitchesAsync():Promise<PitchCardProps>{
   const res = await fetch("https://pitchmatch.azurewebsites.net/Home")
   const resObject = await res.json();
   return resObject;
}