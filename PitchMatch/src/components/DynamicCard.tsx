import { Paper } from "@mui/material";
import { Pitch, User } from "./types";

type DynamicCardProps = {
    user?: {
        name: string;
        bio?: string;
        imgUrl: string;
        location?: string;
    }
    pitch?: {
        title: string;
        summary?: string;
        imgUrl: string;
        location?: string;
    };
}

export function DynamicCard(props: DynamicCardProps) {
    const title: string = props.pitch?.title ?? props.user?.name ?? 'Title';
    const summary: string = props.pitch?.summary ?? props.user?.bio ?? 'Summary';
    const imgUrl: string = props.pitch?.imgUrl ?? props.user?.imgUrl ?? 'https://picsum.photos/200/300';
    const location: string = props.pitch?.location ?? props.user?.location ?? 'Unspecified Location';

    return <>
        <Paper elevation={3} style={{ width: 370, height: 350, overflow: 'hidden' }}>
            <div style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '65%',
                color: 'white',
                fontSize: '175%',
                fontWeight: 'bold',
                textAlign: 'left',
                alignItems: 'end',
                display: 'flex',
            }}>
                <div style={{
                    textShadow: '1px 1px 5px black',
                    backgroundColor: 'rgb(0, 0, 0, 0.2)',
                    padding: 5,
                    paddingLeft: 10,
                    paddingTop: 0,
                    width: '100%',
                    height: 'auto'
                }}>
                    {title}
                </div>
            </div>
            <div style={{
                height: '20%',
                overflow: 'hidden',
                textAlign: 'left',
                padding: 5,
            }}>
                {summary}
            </div>
            <div style={{
                borderTop: 'solid',
                borderWidth: 1,
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 8,
                borderColor:  'rgb(26,126,127)', 
                backgroundColor: 'rgb(26,126,127, 0.1)',
                color: 'rgb(26,126,127)',
                }}>{location}</div>
        </Paper>
    </>
}