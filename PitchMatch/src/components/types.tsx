type Pitch = {
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

  type LogInType={
    email: string;
    password: string;
  }
  
type TokenAndId={
    accessToken:string,
    Id:number
  }
 