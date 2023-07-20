import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"

const EditUser  = () => {
    const user = useSelector((state : RootState) => state.user)
    const { userinfo } = user
  return (
    <>
    <div>{userinfo.username}</div>
    </>
  )
}

export default EditUser