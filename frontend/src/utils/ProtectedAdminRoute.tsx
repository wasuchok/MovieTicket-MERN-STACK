import React, { ReactNode, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import LoadingToRedirect from './LoadingToRedirect'
import axios from 'axios'
import { RootState } from "../redux/store"

interface ProtectedTypes {
    children : ReactNode
}

const ProtectedAdminRoute : React.FC<ProtectedTypes> = ({children}) => {
    const { userinfo } = useSelector((state : RootState) => (state.user))

    const [auth, setAuth] = useState(false)

    const currentAdmin = async (authtoken : string) => {
        await axios.get(`${import.meta.env.VITE_API}/users/currentUser`,{
            headers: {
                authtoken
            }
        }).then((response) => {
            if(response.status == 200) {
                if(response.data.isAdmin) {
                    setAuth(true)
                }
            }
        }).catch((err) => {
            console.log(err)
            setAuth(false)
        })
    }

    useEffect(() => {

        if(localStorage.userinfo) {
            currentAdmin(localStorage.userinfo)
        }

    }, [userinfo])

    return auth ? children : <LoadingToRedirect />
}

export default ProtectedAdminRoute