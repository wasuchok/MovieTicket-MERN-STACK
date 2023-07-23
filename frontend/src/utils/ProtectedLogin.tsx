import React, { ReactNode } from 'react'

import { Navigate } from 'react-router-dom'

interface ProtectedTypes {
    children : ReactNode
}

const ProtectedLogin : React.FC<ProtectedTypes> = ({ children }) => {
    const userLocalStorage: any = localStorage.getItem("userinfo");

    if(userLocalStorage) {
            return <Navigate  to="/" />
    }

    return children
}

export default ProtectedLogin