import { Button, Paper } from "@mui/material";
import { getSession } from "../Context/contextPage";

async function deletePersonalDataAsync(id: number): Promise<void> {

    const res = await fetch(`https://pitchmatch.azurewebsites.net/PersonalData?userId=${id}`, { method: 'DELETE' });

    if (!res.ok) {
        throw new Error('could not delete personal data.');
    }
    else{
        console.log('Successfully deleted personal data.');
    }
}
type DeletePersonalDataProps = {
  onClick: () => void;
}

export function DeletePersonalData({onClick }: DeletePersonalDataProps) {

    const userId = getSession().userId
    const handleDelete = async () => {
        try {
            await deletePersonalDataAsync(userId);
            onClick();

        } catch (error) {
            console.log(error);
        }
    };

    return <Paper elevation={2} style={{ display: 'flex', gap: 15, alignItems: 'center', padding: 10, margin: 20 }}>
        <p style={{ marginBottom: 15 }}>You can delete your personal data at any time, but this will <em style={{ color: "red" }}>remove your verified status</em>. In order to update your personal data, you must delete your data and submit a new verification request.</p>
        <Button onClick={handleDelete} style={{ margin: 10, maxHeight: '65px', minWidth: 100, backgroundColor: "red", color: "white" }}>Delete my data</Button>
    </Paper>
}