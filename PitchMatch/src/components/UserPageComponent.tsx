import { Button, Container, Divider, Paper, Rating } from "@mui/material";
import { PersonalData, Pitch, User } from "./types";
import { AutoAwesome, LocationOn } from "@mui/icons-material";
import { DynamicCard } from "./DynamicCard";
import { Link, useNavigate } from "react-router-dom";

type UserPageProps = {
    user?: {
        id: number,
        name: string,
        contact: string,
        soMe: string,
        cvUrl: string,
        rating: number,
        bio: string,
        imgUrl: string,
        personalData?: PersonalData,
        portfolio?: Pitch[],
    }
    isMyPage: boolean;
}

export function UserPageComponent({ user, isMyPage }: UserPageProps) {
    const navigate = useNavigate();
    const onClickEdit = () => {
        navigate(`/edituser`)
    }
    const onClickVerification = () => {
        navigate(`/verification`)
    }
    if (!user) return <p>User not found</p>;
    return <>
        <div className='page-background'>
            <Container maxWidth='md' sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', textAlign: 'center' }}>
                <Paper elevation={3}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
                        <h2>{user.name}</h2>
                        <div style={{ marginBottom: 3, fontWeight: '600' }}>
                            {user.personalData?.isVerified ? <>Verified user <AutoAwesome color='success' fontSize="small" /></> : <>Unverified user</>}
                        </div>
                    </div>
                    <div>
                        <div style={{
                            display: 'flex', gap: 15, borderTop: 'solid',
                            borderWidth: 1,
                            borderColor: 'rgba(26, 125, 127, 0.564)',
                            padding: 15,
                            minHeight: '20vw'
                        }}>
                            <div style={{
                                flexGrow: 1,
                                width: '250px',
                                overflow: 'hidden',
                                // borderRadius: '4px',
                                // backgroundImage: "url(" + `${user.imgUrl}` + ")",
                                // backgroundPosition: 'top',
                                // backgroundSize: '100%',
                                // backgroundRepeat: 'no-repeat'
                            }}>
                                <img style={{  borderRadius: '4px',}}height={'auto'} width={'100%'} src={`${user.imgUrl}`} />
                            </div>
                            <div style={{ minHeight: '20vh', flexGrow: 3, display: 'flex', flexDirection: 'column', alignContent: 'space-between', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <Rating />
                                        <p>{user.contact}</p>
                                        {user.soMe && <Button variant="contained" href={user.soMe} color="success" sx={{backgroundColor: "rgb(26,126,127)", color: "lightgreen", "&:focus": { outline: "none", } }}>SoMe</Button>}
                                    </div>
                                    <Paper style={{ flexGrow: 2, padding: 5, textAlign: 'left'}}>
                                        <p>{user.bio}</p>
                                    </Paper>
                                </div>
                                {isMyPage && <div style={{ alignSelf: 'flex-end' }}>
                                    <Button variant="contained" color="success" onClick={onClickEdit} sx={{backgroundColor: "rgb(26,126,127)", color: "lightgreen"}}>
                                        Edit</Button>
                                    <Button style={{ marginLeft: 15 }} variant="contained" color="success" onClick={onClickVerification} sx={{backgroundColor: "rgb(26,126,127)", color: "lightgreen"}}>
                                        Verification</Button>
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        borderTop: 'solid',
                        borderWidth: 1,
                        borderColor: 'rgba(26, 125, 127, 0.564)',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        backgroundColor: 'rgb(26,126,127, 0.1)',
                        color: 'rgb(26,126,127)',
                    }}>
                        <div style={{ width: '90%', textAlign: 'left', overflow: 'hidden' }}>{user.personalData ? <>{user.personalData.address}</> : <>Unknown location</>}
                        </div>
                        <LocationOn />
                    </div>
                </Paper>

                <Paper elevation={4} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
                        <h2>Portfolio</h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: 15, borderTop: 'solid',
                        borderWidth: 1,
                        borderColor: 'rgba(26, 125, 127, 0.564)',
                        padding: 15,
                        justifyContent: 'center'
                    }}>
                        {!user.portfolio && <p>No pitches yet.</p>}
                        {user.portfolio?.map((pitch) => (
                            <div key={pitch.id + pitch.title} style={{ justifySelf: 'center' }}>
                                <Link to={`/pitch/${pitch.id}`}>
                                    <DynamicCard key={pitch.id + pitch.title} pitch={pitch} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </Paper>
            </Container>
        </div>
    </>
}