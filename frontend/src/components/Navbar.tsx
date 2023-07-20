import { useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../redux/store"
import { logOut } from "../redux/slices/userSlice"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state : RootState) => state.user)
  const { userinfo } = user

  const Logout = () => {
    dispatch(logOut())
    navigate('/login')
  }

  
  
  return (
    <div className="navbar bg-blue-600 fixed top-0 w-full">
  <div className="flex-1 text-base-100">
    <Link to="/" className="btn btn-ghost normal-case text-xl">SF Movie</Link>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    {!!userinfo.isLogin ? (
    <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/SF_Cinema_logo.jpg" />
      </div>
    </label>
    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li><Link to="/edituser">
        Edit User
      </Link></li>

      <li><button onClick={Logout}>Logout</button></li>
    </ul>
  </div>
     ) : (
      <div className="mx-3">
      <Link to="/login"><button className="bg-blue-400 rounded-lg text-base-100 w-24 h-10 hover:bg-blue-500 mx-2">Login</button></Link>
      <Link to="/register"><button className="bg-blue-400 rounded-lg text-base-100 w-24 h-10 hover:bg-blue-500">Register</button></Link>
    </div>
    )
    }


  </div>
</div>
  )
}

export default Navbar