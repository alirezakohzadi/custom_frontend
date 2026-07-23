import React from 'react'
import { useLoginOrIsLogin } from '../../context/LoginOrIsLogin'
import { Navigate, Outlet } from 'react-router-dom';

function PrivetRoute() {
    const {islogin} = useLoginOrIsLogin()
  return (
    <div>
        {
            !islogin ? <Outlet/> : <Navigate to="/"/>
        }

    </div>
  )
}

export default PrivetRoute;