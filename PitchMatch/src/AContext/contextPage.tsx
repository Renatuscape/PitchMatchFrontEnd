import React from "react";
import { LogInType, TokenAndId } from "../components/types";
export const AuthContext = React.createContext({accessToken: "", Id:0})

async function LogInFunctionality(user:LogInType){
const response= await fetch(`https://pitchmatch.azurewebsites.net/Login`, 
{method:'POST', headers:{'Content-Type':'application/json'} ,body:JSON.stringify(user)});
if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}
 const responseJson=  await response.json()
const LoginResponse:TokenAndId={
  accessToken:responseJson.accessToken,
  Id:responseJson.id,
  IsLogged:true,
    ExpiresAt:responseJson.expiration
}
localStorage.setItem('token', `${LoginResponse.accessToken}`)
    localStorage.setItem('id', `${LoginResponse.Id}`)
    localStorage.setItem('logInStatus', `${LoginResponse.IsLogged}`)
    localStorage.setItem('ExpiresAt', `${LoginResponse.ExpiresAt}`)
    console.log(response)
};

export async function getUserSessionInfo() {
    const sessionInfo: TokenAndId = {
        accessToken: localStorage.getItem('token') ?? "",
        Id: parseInt(localStorage.getItem('id') ?? ""),
        IsLogged: localStorage.getItem('logInStatus') === 'true' ? true : false,
        ExpiresAt: localStorage.getItem('ExpiresAt') ?? ""
    };
    const response = await fetch(`https://pitchmatch.azurewebsites.net/PersonalData/${sessionInfo.Id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    const object = await response.json();
    return object;
}


