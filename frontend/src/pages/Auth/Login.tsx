import { useState, ChangeEvent, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

interface loginUser {
    email : string
    password : string
}


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, setLogin] = useState<loginUser>({
        email : '',
        password : ''
    })
  
    const handleLogin = (event : ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [event.target.name] : event.target.value})
    }

    const onSubmit = async (event : ChangeEvent<HTMLFormElement>) => {
      try {
        event.preventDefault()
        await axios.post(`${import.meta.env.VITE_API}/users/login`, {...login})
        .then((response) => {
          
          if(response.status == 200) {

            let dataUser = JSON.stringify({
                "isLogin" : true,
                "token" : response.data.token
            })


            localStorage.setItem("userinfo", dataUser)

            toast.success(`เข้าสู่ระบบสำเร็จ`)
            
            setTimeout((() => navigate('/')), 2000)
          }
        })
        
      } catch (e) {
        console.log(e)
      }
    }


  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <img
          src="https://yt3.googleusercontent.com/YtXNxUQAvqHzJRulNB-4kpddEsxWj4R95P6cJt5WKjsTAEo-bqsNNkZ92boPBW27cm-PDRCg=s900-c-k-c0x00ffffff-no-rj"
          alt="Registration Image"
          className="mb-6 w-48 mx-auto rounded-lg"
        />
  
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleLogin}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleLogin}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
  
          <button className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Login
          </button>
          <ToastContainer />
        </form>
  
      </div>
    </div>
    </>
  )
}

export default Login