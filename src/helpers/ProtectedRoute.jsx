import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Forbidden from '../pages/NotFound/Forbidden';
import loginCheck from '../helpers/loginCheck';

const ProtectedRoute = ({needsPermission = [], children}) => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    //console.log(loginCheck());

    useEffect(()=> {
        if(loginCheck() == false){
            navigate("/login");
        }
      },[]);

    const userPermissions = cookies.get('userPermissions') || [];
     // console.log(userPermissions)
    const hasPermission = needsPermission.map((permission) => {
        return permission !== undefined && userPermissions?.includes(permission)
    }).includes(true);

    //console.log(hasPermission)
    //console.log(needsPermission.length)

    useEffect(() => {
        if(loginCheck() && !hasPermission && needsPermission.length > 0 && !cookies.get("userAuth")?.isSuper){
           // console.log(hasPermission);
            navigate("/forbidden");       
        }
    },[hasPermission])

    //console.log(children);

    if(needsPermission.length > 0){
        if(hasPermission || cookies.get("userAuth")?.isSuper){
            return children;
        }
        else if(loginCheck()){
            return children;
        }
    }
    else{
        if(loginCheck()){
            return children;
        }
    }

    // return needsPermission.length > 0 ? hasPermission || cookies.get("userAuth")?.isSuper && children : loginCheck() && children;
} 

export default ProtectedRoute