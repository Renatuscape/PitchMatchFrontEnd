import { useEffect, useState } from "react";
import { UserPageCardBottom, UserPageCardMiddle, UserPageCardTop } from "../components/UserPageCard";
import { useParams } from "react-router-dom";
import { Pitch } from "../components/types";

export type UserPageProps = {
   id:number,
   name:string,
   contact:string,
   soMe:string,
   cv:string,
   isVerified:boolean,
       isLogged:boolean,
   bio:string,
   imgUrl:string,
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
         <UserPageCardTop id={user.id} name={user.name} contact={user.contact} soMe={user.contact} cv={user.cv} isVerified={user.isVerified} isLogged={user.isLogged} bio={user.bio} imgUrl={user.imgUrl} portfolio={user.portfolio}  />
         <UserPageCardMiddle {...user} />
         <UserPageCardBottom {...user} />
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