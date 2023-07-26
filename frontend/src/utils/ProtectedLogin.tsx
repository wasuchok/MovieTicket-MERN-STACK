import React, { ReactNode } from 'react'



import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import LoadingToRedirect from './LoadingToRedirect'

interface ProtectedTypes {
    children : ReactNode
}

const ProtectedLogin : React.FC<ProtectedTypes> = ({ children }) => {
    const { userinfo } = useSelector((state : RootState) => state.user)

    return userinfo && userinfo.email ? <LoadingToRedirect To="/" Msg="คุณล็อกอินไปแล้วรู้มั้ย " /> : children 
}

export default ProtectedLogin