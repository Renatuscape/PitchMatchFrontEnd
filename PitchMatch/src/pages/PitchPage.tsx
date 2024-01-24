import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PitchPageComponent } from '../components/PitchPageComponent';
import { PitchPageProps } from '../components/PitchPageComponent';

export type UserParamsType = {
   id: string
}

export async function getPitch(id:number):Promise<PitchPageProps>{
   const res = await fetch(`https://pitchmatch.azurewebsites.net/Pitch/${id}?pitchId=${id}`
   )
   const resObject = await res.json();
   console.log("Fetched data:", resObject);  // Add this line
   return resObject;
}

export function PitchPage() {
  const [pitch, setPitch] = useState<PitchPageProps>();
  const {id} = useParams<keyof UserParamsType>() as UserParamsType;

  console.log('pitch', pitch)

  useEffect(() => {
    getPitch(parseInt(id)).then((res) => setPitch(res));
  }, []);

  if (!pitch) {
    return <div>Loading...</div>;
  }

  return (
    <div className='page-background'>
      <PitchPageComponent {...pitch} />
    </div>
  );
}