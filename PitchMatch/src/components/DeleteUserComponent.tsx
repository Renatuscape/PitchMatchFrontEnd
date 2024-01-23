import { Link, useParams } from "react-router-dom";
import { UserParamsType } from "../pages/UserPage";
import { Button } from "@mui/material";

async function deleteUserAsync(id: number): Promise<void> {

  const res = await fetch(`https://pitchmatch.azurewebsites.net/User?id=${id}`,{ method: 'DELETE' });

  if (!res.ok) {
    throw new Error('could not delete user from backend');
  }
}

type DeleteUserProps = {
    id: string;
    }

export function DeleteUserButton({id}:DeleteUserProps){
  
    const handleDelete = async () => {
        try {
        await deleteUserAsync(parseInt(id, 10));

        } catch (error) {
        console.log(error);
        }
    };
    
    return (
        <div>
        <Button type="submit" variant="contained" color="success" sx={{ margin: 2 , "&:focus":{outline: "none",}}}onClick={handleDelete}>Delete</Button>
        </div>
    );
}
