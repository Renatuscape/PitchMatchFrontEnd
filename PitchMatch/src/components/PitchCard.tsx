import Paper from '@mui/material/Paper';

type PitchCardProps = {
    imgUrl?: string,
    title: string,
    content: string
}
export function PitchCard(props: PitchCardProps) {
    return <>
        <Paper elevation={2} sx={{width:350, height:350, margin:1}}>
            {props.imgUrl ? <img className='pitch-card-image' src={props.imgUrl}/> : <img className='pitch-card-image' src='https://img.freepik.com/free-vector/support-local-business-concept_52683-41530.jpg'/>}
            <div style={{padding: 10}}>
                <h2>{props.title}</h2>
            <p>{props.content}</p>
            </div>
            </Paper>
    </>
}