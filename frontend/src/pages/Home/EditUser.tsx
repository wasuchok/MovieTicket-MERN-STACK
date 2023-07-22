import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import axios from 'axios'
import { ChangeEvent } from "react"
import moment from 'moment'


const EditUser  = () => {
    const user = useSelector((state : RootState) => state.user)
    const { userinfo } = user

    const [name, setName] = useState({
      username : '',
      email : '',
      createdAt : new Date(),
      updatedAt : new Date()
    })

    const token = JSON.parse(localStorage.userinfo).token

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
              setName(response.data)
            }
          });
      } catch (err: any) {
        console.log(err.message)
      }
    };

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
      setName({...name, [e.target.name] : e.target.value})
    }

    const onSubmit = async (event : ChangeEvent<HTMLFormElement>) => {
      try {
        const authtoken = JSON.parse(localStorage.userinfo).token
        event.preventDefault()
        await axios.post(`${import.meta.env.VITE_API}/users/editUser`, {
          "_id" : userinfo._id,
          "username" : name.username
        }, {
          headers : {
            authtoken
          }
        }).then((response) => {
          if(response.status == 200) {
            currentUser(token)
          }
        })
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
      
      currentUser(token)
    },[])
  return (
    <>
<div className=" mx-auto py-8">
  <h1 className="text-2xl flex justify-center mb-5 font-bold">แก้ไขข้อมูลส่วนตัว {userinfo.email}</h1>
  <form className="max-w-sm mx-auto" onSubmit={onSubmit}>

  <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">createdAt</label>
      <input type="email" id="email"   name="email" value={moment(name.createdAt).format('ll')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email address" disabled />
    </div>

    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">updatedAt</label>
      <input type="email" id="email"   name="email" value= {moment(name.updatedAt).fromNow()} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email address" disabled />
    </div>

  <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input type="email" id="email"   name="email" value={name.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email address" disabled />
    </div>

    <div className="mb-4">
      <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
      <input type="text" id="username"   name="username" value={name.username} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your username" />
    </div>

    <div className="flex items-center justify-center">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Edit
      </button>
    </div>
  </form>
</div>


    </>
  )
}

export default EditUser