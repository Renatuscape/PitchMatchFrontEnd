import { PitchEditCard} from "../components/PitchEditCard";

 export function EditPitch(){
    return <>
      <div className='page-background'>
         <PitchEditCard editPitch={function (pitch: { title: string; summary: string; description: string; imgUrl: string; videoUrl: string; location: string; goal: number; pitchYield: number; category: string; }): void {
           throw new Error("Function not implemented.");
          } } />
      </div>
    </>
 }

 