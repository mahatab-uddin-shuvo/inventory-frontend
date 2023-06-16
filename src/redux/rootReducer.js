import { combineReducers } from "redux";
import SubmanuStateReducer from "./Submenu/subReducer";


 const rootReducer = combineReducers({
    SubmanuState: SubmanuStateReducer,

})

export default rootReducer;
