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

  export type User = {
    id:number;
    name:string;
    email: string;
    bio: string;
    contact:string;
    soMe:string;
    imgUrl:string;
    cvUrl:string;
    rating:number;
    portfolio:Pitch[];
    isLogged: boolean,
  }

  export type PersonalData = {
    id:number;
    phoneNumber:string;
    personNr:string;
    address:string;
    latitude:number;
    longitude:number;
    isVerified:boolean;
    userId:number;
  }
  
export type TokenAndId={
    accessToken:string,
    userId:number,
    IsLogged:boolean,
    expiresIn:string,
  }
 