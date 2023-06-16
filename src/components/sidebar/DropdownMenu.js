import React, {useState} from 'react'
import { AiFillCaretDown } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { submanu_closed, submanu_open } from '../../redux';

export default function DropdownMenu({item, key, isOpen}) {
    const [childShow, setChildShow] = useState(false);
    const showChildren = (id) => {
        // setChildShow(!childShow)
        if(SubmanuState.data == id.id){
            dispatch(submanu_closed('x'))
        } else{
            dispatch(submanu_open(id.id))
        }
    };

    // dispatch function from redux
    const dispatch = useDispatch()

    // get all redux state data
    // const {  User, UpdatedUser } = useSelector(state=> state);
    const { SubmanuState } = useSelector(state=> state);
  return (
    <>
        <div className="manu_wrapper" key={key}>
            <>
           { item.submenue && item.submenue.length > 0 ? 
                <>
                <div className="link" onClick={()=>showChildren(item)} >
                    <div className="icon">{item.icon}</div>
                    <div className={(SubmanuState.data == item.id) && SubmanuState.activeState ?'Downicon up':'Downicon'} ><AiFillCaretDown/></div>
                    <div className="link_text">{item.name}</div>
                </div>
                <div className={(SubmanuState.data == item.id) && SubmanuState.activeState ?`nav_children`:'d-none'} id={item.name}>
                    {item.submenue.map((Childitem, index)=>
                        <NavLink to={Childitem.path} key={index} className={`link ${isOpen ? "ps-5" : "ps-3"} `} activeclassName="active" >
                            <div className="icon">{Childitem.icon}</div>
                            <div className="link_text">{Childitem.name}</div>
                        </NavLink>
                    )}
                </div>
                </>
            :
                <NavLink to={item.path} className="link" onClick={()=>showChildren(item)}>
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                </NavLink>
                }
            </> 
        </div>
    
    
    </>
  )
}
