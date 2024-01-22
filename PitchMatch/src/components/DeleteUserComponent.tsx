import { Link, useParams } from "react-router-dom";
import { UserParamsType } from "../pages/UserPage";
import { Button } from "@mui/material";

async function deleteUserAsync(id: number): Promise<void> {

  const res = await fetch(`https://pitchmatch.azurewebsites.net/User?id=${id}`,{ method: 'DELETE' });

  if (!res.ok) {
    throw new Error('could not delete user from backend');
  }
}

export function DeleteUserButtom(){
    const { id } = useParams<keyof UserParamsType>() as UserParamsType;

    
    const handleDelete = async () => {
        try {
        await deleteUserAsync(parseInt(id, 10));

        } catch (error) {
        console.log(error);
        }
    };
    
    return (
        <div>
        <Link to="/">
        <Button onClick={handleDelete}>Delete</Button>
        </Link>
        </div>
    );
    }
