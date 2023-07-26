import React, { ReactNode } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import LoadingToRedirect from './LoadingToRedirect'

interface ProtectedTypes {
    children : ReactNode
}

const UserRoute : React.FC<ProtectedTypes> = ({ children }) => {

    const { userinfo } = useSelector((state : RootState) => (state.user))


  return userinfo && userinfo.email ? children : <LoadingToRedirect To="/login" Msg="คุณไม่มีสิทธิ์เข้าถึง" />
}

export default UserRoute