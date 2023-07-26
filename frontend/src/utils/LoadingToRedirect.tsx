import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface LoadingType {
  To : string,
  Msg : string
}

const LoadingToRedirect : React.FC<LoadingType> = ({ To, Msg }) => {
    const navigate = useNavigate()
    const [ count, setCount ] = useState<number>(3)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)

        // count == 0 && navigate("/login")
        if(count == 0) navigate(`${To}`)

        return () => clearInterval(interval)
    },[count])

  return (
    <div>{Msg}, จะพาคุณไปใน {count}</div>
  )
}

export default LoadingToRedirect