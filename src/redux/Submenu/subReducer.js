import { SIDEBAR_OPEN, SIDEBAR_CLASE } from "./subType"


const initialState = {
    activeState: false,
    data : [],
}

const SubmanuStateReducer = (store = initialState, action) =>{
    switch(action.type){
        case SIDEBAR_OPEN : 
            return{
                ...store ,
                activeState: true,
                data : action.payload,

            }
        case SIDEBAR_CLASE : 
            return{
                ...store ,
                activeState: false,
                data: action.payload,
            }
        default : return store
    }
}
export default SubmanuStateReducer