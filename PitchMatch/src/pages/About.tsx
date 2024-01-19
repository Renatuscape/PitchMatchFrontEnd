import { Container } from "@mui/material";

export function About() {
    return <div className='page-background'>
        <Container maxWidth='md' sx={{ backgroundColor: 'white', padding: 2, display: 'flex', alignItems: 'flex-end'}}>
            <div style={{marginBottom: 15, minHeight: '70vh'}}>
                <h2>What is PitchMatch?</h2>
                <p>
                    PitchMatch is a platform that connects early startups with investors.
                    We differ from other investment platforms because we highlight the entrepreneurs near your location,
                    taking up the battle against centralisation and providing you with the opportunity to engage with your community in a new and meaningful way.
                    Anyone can start a business, and everyone should have a chance to safely invest in projects they believe in!
                    That is why we do our best to provide intuitive guides and robust security checks, and a streamlined experience from start to finish.
                </p>
                <h2 style={{marginTop: 15}}>The team behind PitchMatch</h2>
                <p>
                    PitchMatch is provided by FixedConnections.
                    The three of us are a team of students at Brights/Academic Work who are passionate about bringing people together.
                    As soon as we started pitching ideas for our graduation project, we realised that our major common interest is that we want to foster good, lasting relationships.
                    What could we do to help people connect with each other in a meaningful way?
                    By creating or funding local initiatives with us, you will build experiences and opportunities that establish lasting bonds.
                    PitchMatch doesn't just bring people together - it builds communities.
                </p>
            </div>
            <img height='250px' style={{marginLeft: 20, marginRight: -70, marginBottom: 0}} src='https://i.imgur.com/FvawpSc.png'/>
        </Container>
    </div>
}