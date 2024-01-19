import { PitchCard } from "../components/PitchCard";

export function Home(){
    return<div className="page-background" style={{minHeight:'75vh'}}>
        <div className="home-picture">
            <div className="goal-float">2,300<p>Projects funded</p></div>
            <div className="goal-float" id="goal-float-main">4 MIL<p>In annual yields</p></div>
            <div className="goal-float">6,500<p>Local jobs created</p></div>
        </div>
        <div style={{width: '100vw', display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto', textAlign: 'center'}}>
            <PitchCard title="Test" content="Test test test"/>
            <PitchCard title="Test" content="Test test test"/>
            <PitchCard title="Test" content="Test test test"/>
            <PitchCard title="Test" content="Test test test"/>
            <PitchCard title="Test" content="Test test test"/>
            <PitchCard title="Test" content="Test test test"/>
        </div>
    </div>
}