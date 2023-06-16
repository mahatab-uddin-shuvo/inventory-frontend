import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'
import Sidebar from '../sidebar/Sidebar'

export default function Layout({children}) {

  const [success, setSuccess] = useState(localStorage.getItem("success"));
  const [successEdit, setSuccessEdit] = useState(localStorage.getItem("successEdit"));
  // console.log(success);

  if(success){
    setTimeout(() =>{
      localStorage.removeItem("success");
      setSuccess(false);
    }
      , 2000
    )
  }

  if(successEdit){
    setTimeout(() =>{
      localStorage.removeItem("successEdit");
      setSuccessEdit(false);
    }
      , 2000
    )
  }
  return (
    <>
        {
            success &&
                (
                    <Toast bg='success' style={{position: 'fixed', top:'30px', right:'0', zIndex:'111111'}}>
                        <Toast.Body >Succesfully Saved</Toast.Body>
                    </Toast>
                )
        }
        {
            successEdit &&
                (
                    <Toast bg='success' style={{position: 'fixed', top:'30px', right:'0', zIndex:'111111'}}>
                        <Toast.Body >Succesfully Updated</Toast.Body>
                    </Toast>
                )
        }
        <Sidebar>
            {children}
        </Sidebar>
    </>
  )
}
