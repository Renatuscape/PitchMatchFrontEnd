import { useEffect, useState } from "react";
import { UserPageCard2, UserPageCard3, UserPageCard4 } from "../components/UserPageCard";
import { useParams } from "react-router-dom";

export type UserPageProps = {
   id:number,
   name:string,
   contact:string,
   soMe:string,
   cv:string,
   bio:string,
   portfolio:Pitch[],
}

export type UserParamsType = {
   id: string
}

 export function UserPage(){
   const[user, setUser] = useState<UserPageProps>();
   const {id} = useParams<keyof UserParamsType>() as UserParamsType;

   useEffect(()=>{
         getUser(parseInt(id)).then((res) => setUser(res));
   }
   ,[])
   
    return (
    <>
    <div className='page-background'>
      {user ? (
        <>
         <UserPageCard4 {...user} />
         <UserPageCard2 {...user} />
         <UserPageCard3 {...user} />
        </>
      ) : (
        // Optionally, you can show a loading state or some other message
        <div>Loading...</div>
      )}
      </div>
    </>
  );
 }
 
export async function getUser(id:number):Promise<UserPageProps>{
   const res = await fetch("https://pitchmatch.azurewebsites.net/user/"+id)
   const resObject = await res.json();
   return resObject;
}