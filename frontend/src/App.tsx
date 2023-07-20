import axios from "axios";

//Router
import { Routes, Route, useNavigate } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";

//Pages
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import EditUser from "./pages/Home/EditUser";

//React
import { useEffect } from "react";

//Redux
import { useDispatch } from "react-redux";

//Function Redux
import { userLogin } from "./redux/slices/userSlice";

//utils
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedLogin from "./utils/ProtectedLogin";

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
            dispatch(userLogin({...response.data, "isLogin" : true}))
          }
        });
    } catch (err: any) {
      if (err.response.data == "JWT Expired" && err.response.status == 500) {
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

  useEffect(() => {
    if (localStorage.userinfo) {
      const userData = {
        isLogin: JSON.parse(localStorage.userinfo).isLogin,
        isAdmin: JSON.parse(localStorage.userinfo).isAdmin,
        email: JSON.parse(localStorage.userinfo).email,
      };
      currentUser(JSON.parse(localStorage.userinfo).token);
      dispatch(userLogin(userData));
    }
  }, [currentUser]);
  return (
    <>
      <Navbar />
      <div className="mt-20">
        <Routes>
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
        </Routes>
      </div>
    </>
  );
};

export default App;
