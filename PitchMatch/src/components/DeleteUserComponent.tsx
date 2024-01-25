import { Link, useNavigate, useParams } from "react-router-dom";
import { UserParamsType } from "../pages/UserPage";
import { Button } from "@mui/material";
import { useAuth } from "../App";

async function deleteUserAsync(id: number): Promise<void> {

  const res = await fetch(`https://pitchmatch.azurewebsites.net/User?id=${id}`,{ method: 'DELETE' });

  if (!res.ok) {
    throw new Error('could not delete user from backend');
  }
}



export function DeleteUserButton(){
  const userId=useAuth().token?.userId;
  const navigate = useNavigate();
  const{onLogout}=useAuth();
    const handleDelete = async () => {
        try {
        await deleteUserAsync(userId!);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('logInStatus');
        localStorage.removeItem('expiresIn');
        onLogout();
        navigate("/");
    
        } catch (error) {
        console.log(error);
        }
    };
    
    return (
        <div>
        <Button type="submit" variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
        </div>
    );
}
