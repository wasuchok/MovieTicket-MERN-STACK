import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoadingToRedirect = () => {
    const navigate = useNavigate()
    const [ count, setCount ] = useState<number>(3)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)

        // count == 0 && navigate("/login")
        if(count == 0) navigate("/login")

        return () => clearInterval(interval)
    },[count])

  return (
    <div>No Permission, Redirect in {count}</div>
  )
}

export default LoadingToRedirect