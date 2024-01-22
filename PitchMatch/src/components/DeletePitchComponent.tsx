import { Button } from "@mui/material";
import { Link } from "react-router-dom";

async function deletePitchAsync(id: number): Promise<void> {

  const res = await fetch(`https://pitchmatch.azurewebsites.net/Pitch/${id}?pitchId=${id}`,{ method: 'DELETE' });

  if (!res.ok) {
    throw new Error('could not delete user from backend');
  }
}

type DeletePitchProps = {
    id: string;
}

export function DeletePitchButton({id}:DeletePitchProps){
  
    const handleDelete = async () => {
        try {
        await deletePitchAsync(parseInt(id, 10));

        } catch (error) {
        console.log(error);
        }
    };
    
    return (
        <div>
        <Link to="/">
        <Button type="submit" variant="contained" color="success" sx={{ marginLeft: 2 , "&:focus":{outline: "none",}}} onClick={handleDelete}>Delete</Button>
        </Link>
        </div>
    );
}
