import { Create } from "@mui/icons-material";
import { CreateUserCard } from "./components/CreateUserCard";
import { Container, Grid } from "@mui/material";
import { LogInCard } from "./components/LogInCard";
import React from "react";
import { useNavigate } from "react-router-dom";
type LoginProps={
  LoginFunctionality:(userInfo:LogInType)=>Promise<void>
}

export function LogIn({LoginFunctionality}:LoginProps) {
    const[email,setEmail]=React.useState<string>("")
    const[password,setPassword]=React.useState<string>("")
    const navigate = useNavigate();

const handlerSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    const userInfo:LogInType={email:email,password:password}
    await LoginFunctionality(userInfo).then(response=> navigate("/"))
    }

   
return<>
<Container>
<Grid container >
    
     <Grid item xs={6}> <LogInCard onSubmit={handlerSubmit} onChangeEmail={setEmail} onChangePassword={setPassword} email={email} password={password}/> </Grid>
     <Grid item xs={6}> <CreateUserCard/> </Grid>
</Grid>
</Container>
</>
}

