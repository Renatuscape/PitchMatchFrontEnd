import { CreateUserCard } from "../components/CreateUserCard";
import { Container, Grid } from "@mui/material";
import { LogInCard } from "../components/LogInCard";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogInType, TokenAndId } from "../components/types";
import { useAuth } from "../App";

// type LoginProps = {
//   LoginFunctionality: (userInfo: LogInType) => Promise<void>;
// };

export function LogIn() {
  const { onLogin } = useAuth();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlerSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userInfo: LogInType = { email: email, password: password };

    onLogin(userInfo);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="page-background" style={{ height: "700px" }}>
        <Container>
          <Grid container>
            <Grid item xs={6}>
              {" "}
              <LogInCard
                onSubmit={handlerSubmit}
                onChangeEmail={setEmail}
                onChangePassword={setPassword}
                email={email}
                password={password}
                passwordVisibility={showPassword}
                onTogglePasswordVisibility={handleTogglePasswordVisibility}
              />{" "}
            </Grid>
            <Grid item xs={6}>
              {" "}
              <CreateUserCard />{" "}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
