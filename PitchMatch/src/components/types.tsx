export type Pitch = {
    Id: number;
    title: string; 
    summary: string; 
    description: string;
    imgUrl: string;
    videoUrl: string;
    location: string;
    goal: number;
    pitchYield: number;
    category: string;
    userId: number;
  };

  export type LogInType={
    email: string;
    password: string;
  }
  
export type TokenAndId={
    accessToken:string,
    userId:number,
    IsLogged:boolean,
    expiresIn:string,
  }
 