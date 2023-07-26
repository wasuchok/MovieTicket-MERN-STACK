import axios from "axios";

//Router
import { Routes, Route, useNavigate } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";

//Components Admin
import SidebarAdmin from "./components/SidebarAdmin";

//Pages Users
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import EditUser from "./pages/Home/EditUser";

//Pages Admin
import AdminIndex from './pages/Admin/Index'
import ManageUser from "./pages/Admin/ManageUsers";
import ManageMovies from "./pages/Admin/ManageMovies";

//Redux
import { useDispatch } from "react-redux";

//Function Redux
import { userLogin } from "./redux/slices/userSlice";

//utils
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedLogin from "./utils/ProtectedLogin";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";



const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = async (authtoken: string) => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API}/users/currentUser`, {
          headers: {
            authtoken,
          },
        })
        .then((response) => {
          if(response.status == 200) {
            dispatch(userLogin({...response.data}))
          }
        });
    } catch (err: any) {
      if (err.response.data == "JWT Expired" || err.response.status == 500) {
        localStorage.removeItem("userinfo");
        dispatch(
          userLogin({
            email: "",
            isAdmin: false,
            isLogin: false,
          })
        );
        navigate("/login");
      }
    }
  };

    if (localStorage.userinfo) {
      currentUser(localStorage.userinfo);
    }

  return (
    <>
      <Navbar />
      <div className="mt-20">
        <Routes>
         {/* Start Route User */}
          <Route
            path="/register"
            element={
              <ProtectedLogin>
                <Register />
              </ProtectedLogin>
            }
          />

          <Route
            path="/login"
            element={
              <ProtectedLogin>
                <Login />
              </ProtectedLogin>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edituser"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />

          {/* End Route User */}

          {/* Start Route Admin */}

          <Route
            path="/admin/"
            element={
              <ProtectedAdminRoute>
                <div className="flex">
                <SidebarAdmin />
                <AdminIndex />
                </div>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/manageusers"
            element={
              <ProtectedAdminRoute>
                <div className="flex">
                <SidebarAdmin />
                <ManageUser />
                </div>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/managemovies"
            element={
              <ProtectedAdminRoute>
                <div className="flex">
                <SidebarAdmin />
                <ManageMovies />
                </div>
              </ProtectedAdminRoute>
            }
          />

          {/* End Route Admin */}
        </Routes>
      </div>
    </>
  );
};

export default App;
