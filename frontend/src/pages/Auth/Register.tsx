import { useState, ChangeEvent } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useEffect } from 'react'

interface createUser {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Register = () => {
  const navigate = useNavigate()
  const [create, setCreate] = useState<createUser>({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreate({ ...create, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (create.password == create.confirm_password) {
        await axios
          .post(`${import.meta.env.VITE_API}/users/register`, { ...create })
          .then(async (response) => {
            if (response.status === 201) {
              await toast.success(`${response.data}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
              });
              navigate('/login')
            }
          });
      } else {
        toast("รหัสผ่านไม่ตรงกันครับฟู่ววว", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const userLocalStorage = localStorage.userinfo
    if(userLocalStorage) {
        navigate("/")
    }
  },[])

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
        <img
          src="https://yt3.googleusercontent.com/YtXNxUQAvqHzJRulNB-4kpddEsxWj4R95P6cJt5WKjsTAEo-bqsNNkZ92boPBW27cm-PDRCg=s900-c-k-c0x00ffffff-no-rj"
          alt="Registration Image"
          className="mb-6 w-48 mx-auto rounded-lg"
        />

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm_password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" required />
              <span className="ml-2">I agree to the terms and conditions</span>
            </label>
          </div>
          <button className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Register
          </button>
          <ToastContainer />
        </form>
        <p className="text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="#" className="text-blue-500">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
