import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import loginCheck from '../helpers/loginCheck';

const ComponentGuard = ({needsPermission, children}) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(()=> {
    if(!loginCheck()){
        navigate("/login");
    }
  },[]);
  const userPermissions = cookies.get('userPermissions');
  
  const hasPermission = needsPermission.map((permission) => {
    return permission !== undefined && userPermissions?.includes(permission)
  }).includes(true);

  // useEffect(() => {
  //   if(!hasPermission && needsPermission.length > 0){
  //       return;
  //   }
  // },[hasPermission])

  return !cookies.get("userAuth")?.isSuper ? hasPermission ? children : needsPermission.length == 0 ? children : <></> : children;
}

export default ComponentGuard;