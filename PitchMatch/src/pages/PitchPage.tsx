import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PitchPageComponent } from '../components/PitchPageComponent';
import { PitchPageProps } from '../components/PitchPageComponent';

export type UserParamsType = {
   id: string
}

export async function getUser(id:number):Promise<PitchPageProps>{
   const res = await fetch("https://pitchmatch.azurewebsites.net/pitch/"+id)
   const resObject = await res.json();
   return resObject;
}

export function PitchPage() {
  const [project, setPitch] = useState<PitchPageProps>();
  const {id} = useParams<keyof UserParamsType>() as UserParamsType;

  useEffect(() => {
    getUser(parseInt(id)).then((res) => setPitch(res));
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className='page-background'>
      <h1>{project.title}</h1>
      <PitchPageComponent {...project} />
    </div>
  );
}