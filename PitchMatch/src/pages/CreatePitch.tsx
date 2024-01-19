import CreatePitchComponent from "../components/CreatePitchComponent";

export function CreatePitch(){
    return <>
    <div className='page-background'>
    <CreatePitchComponent addPitch={function (pitch: { title: string; summary: string; description: string; imgUrl: string; videoUrl: string; location: string; goal: number; pitchYield: number; category: string; }): void {
          throw new Error("Function not implemented.");
       } } />
      </div>
    </>
 }