import CreatePitchComponent from "../components/CreatePitchComponent";
import { Pitch } from "../components/types";

export function CreatePitch(){
   const addPitch = (pitch: Pitch): void => {
      console.log("New pitch created:", pitch);
  };
   return (
      <div className='page-background'>
          <CreatePitchComponent addPitch={addPitch} />
      </div>
  );
 }