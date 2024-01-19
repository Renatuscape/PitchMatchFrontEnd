import { Create } from "@mui/icons-material";
import { CreateUserCard } from "./components/CreateUserCard";
import { Container, Grid } from "@mui/material";
import { LogInCard } from "./components/LogInCard";


export function LogIn() {
return<>
<Container>
<Grid container >
     <Grid item xs={6}> <LogInCard/> </Grid>
     <Grid item xs={6}> <CreateUserCard/> </Grid>
</Grid>
</Container>
</>
}

