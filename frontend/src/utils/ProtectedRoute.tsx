import { useSelector } from "react-redux"
import LoadingToRedirect from "./LoadingToRedirect"
import React from "react"
import { RootState } from "../redux/store"
import { ReactNode } from 'react'

interface ProtectedTypes {
  children : ReactNode
}

const ProtectedRoute : React.FC<ProtectedTypes> = ({ children }) => {

    const { userinfo } = useSelector((state : RootState) => (state.user))


  return userinfo && localStorage.userinfo ? children : <LoadingToRedirect />
}

export default ProtectedRoute