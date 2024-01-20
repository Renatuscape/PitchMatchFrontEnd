import { PitchEditCard} from "../components/PitchEditCard";

 export function EditPitch(){
    return <>
      <div className='page-background'>
         <PitchEditCard id={0} editPitch={function (pitch: Pitch): void {
             throw new Error("Function not implemented.");
          } } />
      </div>
    </>
 }

 