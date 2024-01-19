import Paper from '@mui/material/Paper';
import { UserSearchProps } from './SearchBar';

export function UserSearchCard(user:UserSearchProps) {
    return <>
        <Paper elevation={2} sx={{width:350, height:350, margin:1}}>
            {user.profilePictureUrl ? <img className='pitch-card-image' src={user.profilePictureUrl}/> : <img className='pitch-card-image' src='https://phlearn.com/wp-content/uploads/2014/07/031_Rounded_Rectangle_Tool_Basic_Thumbnail_Sixteen_Nine.jpg?w=640&quality=99&strip=all'/>}
            <div style={{padding: 10}}>
                <h2>{user.name}</h2>
            <p>{user.location}</p>
            </div>
            </Paper>
    </>
}