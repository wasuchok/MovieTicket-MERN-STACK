import React from 'react'

import { Navigate } from 'react-router-dom'



const ProtectedLogin : React.FC<any> = ({ children }) => {
    const userLocalStorage: any = localStorage.getItem("userinfo");
    const userinfo: any = JSON.parse(userLocalStorage);

    if(userLocalStorage) {
        if(userinfo.isLogin) {
            return <Navigate  to="/" />
        }
    }

    return children
}

export default ProtectedLogin