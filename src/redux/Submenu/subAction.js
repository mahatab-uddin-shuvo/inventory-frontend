import { SIDEBAR_OPEN, SIDEBAR_CLASE } from "./subType"


export const submanu_open = (data)=>{
   return {
        type: SIDEBAR_OPEN,
        payload: data
   }
}

export const submanu_closed = (data)=>{

    return {
         type: SIDEBAR_CLASE,
         payload: data
    }
 }


 export const ChangeState =()=>{
    
 
  }