import React from "react";
import { LogInType, TokenAndId } from "../components/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPageProps } from "../pages/UserPage";
import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
export const AuthContext = React.createContext({accessToken: "", Id:0})

export async function LogInFunctionality(user:LogInType){
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

export function LogedInIcon() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserPageProps | null>()
    useEffect(() => {
        getUserSessionInfo().then(res => setUser(res));
    }, [])
 
    function handleLogOut() {
        localStorage.clear();
        setUser(null);
        navigate('/');
    }
 
    if (user) {
        return (
            <>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Typography gutterBottom variant="h4" component="div">
                        {user.name ?? 'novalue'}
                    </Typography>
 
                    <Button style={{textAlign: 'center', height: '50px'}} variant="contained" onClick={handleLogOut}>
                        Log out
                    </Button>
                </div>
            </>
        )
    }
}

