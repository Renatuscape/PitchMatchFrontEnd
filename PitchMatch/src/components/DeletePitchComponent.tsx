import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../App";

async function deletePitchAsync(id: number): Promise<void> {

  const res = await fetch(`https://pitchmatch.azurewebsites.net/Pitch/${id}?pitchId=${id}`,{ method: 'DELETE' });

  if (!res.ok) {
    throw new Error('could not delete user from backend');
  }
}

type DeletePitchProps = {
    id: number;
}

export function DeletePitchButton({id}:DeletePitchProps){
  const navigate = useNavigate();
    const handleDelete = async () => {
        try {
        await deletePitchAsync(id);
        navigate("/");
        } catch (error) {
        console.log(error);
        }
    };

    
    return (
        <div>
        <Link to="/">
        <Button type="submit" variant="contained" color="secondary" sx={{"&:focus":{outline: "none",}}} onClick={handleDelete}>Delete</Button>
        </Link>
        </div>
    );
}
