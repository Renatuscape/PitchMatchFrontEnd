import React from "react";
import { LogInType, TokenAndId } from "../components/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPageProps } from "../pages/UserPage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../App";
export const AuthContext = React.createContext({ accessToken: "", Id: 0 });

export async function LogInFunctionality(user: LogInType) {
//   const response = await fetch(`https://pitchmatch.azurewebsites.net/Login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   });
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
//   const responseJson = await response.json();
//   const LoginResponse: TokenAndId = {
//     accessToken: responseJson.accessToken,
//     userId: responseJson.userId,
//     IsLogged: true,
//     expiresIn: responseJson.expiresIn,
//   };
//   localStorage.setItem("token", `${LoginResponse.accessToken}`);
//   localStorage.setItem("userId", `${LoginResponse.userId}`);
//   localStorage.setItem("logInStatus", `${LoginResponse.IsLogged}`);
//   localStorage.setItem("expiresIn", `${LoginResponse.expiresIn}`);
//   console.log(response);
}

export async function getUserSessionInfo() {
  const sessionInfo: TokenAndId = getSession();
  const response = await fetch(
    `https://pitchmatch.azurewebsites.net/PersonalData/${sessionInfo.userId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const object = await response.json();
  return object;
}

export function getSession() {
  const sessionInfo: TokenAndId = {
    accessToken: localStorage.getItem("token") ?? "",
    userId: parseInt(localStorage.getItem("userId") ?? ""),
    IsLogged: localStorage.getItem("logInStatus") === "true" ? true : false,
    expiresIn: localStorage.getItem("expiresIn") ?? "",
  };

  return sessionInfo;
}

export function LoggedInIcon() {
    const{onLogout}= useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserPageProps | null>();
  useEffect(() => {
    async function fetchUserSessionInfo() {
      try {
        const res = await getUserSessionInfo();
        setUser(res);
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    }
    fetchUserSessionInfo();
  }, []);

  function handleUserPage() {
    navigate(`/user/${user?.id}`);
  }

  if (user) {
    return (
      <div style={{height: 30, display: 'flex', alignItems: 'end', backgroundColor: 'orange'}}>
          <AccountCircleIcon
            sx={{ fontSize: 40, my: 2,
              color: "#1a7d7f",
              "&:focus": { outline: "none" }}}
            onClick={handleUserPage}
          />
          <Button
            sx={{
              my: 2,
              color: "black",
              display: "block",
              "&:focus": { outline: "none" },
            }}
            onClick={onLogout}>
            Log out
          </Button>
      </div>
    );
  }
}
