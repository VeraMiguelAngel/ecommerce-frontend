'use client'
import { useAuth } from "@/context/AuthContext"


const UserView = () => {
  const {userData} = useAuth()

  return (
    <div>
      <p>Usuario: {userData?.user.name}</p>
      <p>Email: {userData?.user.email}</p>
    </div>
  )
}

export default UserView