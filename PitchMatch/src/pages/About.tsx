import { Container, Paper } from "@mui/material";

export function About() {
    return <div className='page-background'>
        <Container maxWidth='md' sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
                    <h2>What is PitchMatch?</h2>
                </div>
                <div style={{
                    display: 'flex', borderTop: 'solid',
                    borderWidth: 1,
                    borderColor: 'rgba(26, 125, 127, 0.564)',
                }}>
                    <p style={{padding: 10}}>
                        PitchMatch is a platform that connects early startups with investors.
                        We differ from other investment platforms because we highlight the entrepreneurs near your location,
                        taking up the battle against centralisation and providing you with the opportunity to engage with your community in a new and meaningful way.
                        Anyone can start a business, and everyone should have a chance to safely invest in projects they believe in!
                        That is why we do our best to provide intuitive guides and robust security checks, and a streamlined experience from start to finish.
                    </p>
                    <img height='250px' width='auto' style={{zIndex: 2, marginBottom: '-60px', marginTop: '-40px', marginRight: '-45px', }} src='https://i.imgur.com/FvawpSc.png' />
                </div>
            </Paper>
            <Paper elevation={3} style={{display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '5px 15px', backgroundColor: 'rgb(26,126,127, 0.1)', }}>
                <h2>The team behind PitchMatch</h2>
                </div>
                <p style={{
                    display: 'flex', borderTop: 'solid',
                    borderWidth: 1,
                    borderColor: 'rgba(26, 125, 127, 0.564)',
                    padding: 10
                }}>
                    PitchMatch is provided by FixedConnections.
                    The three of us are a team of students at Brights/Academic Work who are passionate about bringing people together.
                    As soon as we started pitching ideas for our graduation project, we realised that our major common interest is that we want to foster good, lasting relationships.
                    What could we do to help people connect with each other in a meaningful way?
                    By creating or funding local initiatives with us, you will build experiences and opportunities that establish lasting bonds.
                    PitchMatch doesn't just bring people together - it builds communities.
                </p>
                <Paper elevation={3} style={{padding: 10, height: 250, margin: 'auto', marginTop: 20, marginBottom: 25, width: '60%', textAlign: 'center'}}>
                    <p style={{marginTop: '110px'}}>[A beautiful picture of us]</p>
                </Paper>
            </Paper>
        </Container>
    </div>
}