import { UserPageCard2, UserPageCard3, UserPageCard4 } from "../components/UserPageCard";
export type UserPageProps = {
   id:number,
   name:string,
   contact:string,
   soMe:string,
   cv:string,
   bio:string,
}
 export function UserPage(props:UserPageProps){
    return <>
    <UserPageCard4 {...props}/>
    <UserPageCard2 {...props}/>
    <UserPageCard3 {...props}/>
    </>
 }
 export async function getUser(id:number):Promise<UserPageProps>{
const res = await fetch("https://pitchmatch.azurewebsites.net/user/"+id)
const resObject = await res.json();
return resObject;
}