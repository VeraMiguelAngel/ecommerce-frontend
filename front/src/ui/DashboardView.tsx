'use client';

import { useAuth } from "@/context/AuthContext"

const DashboardView = () => {
    const { userData } = useAuth();
  return (
    <div>
        <h1>Perfil de usuario: {userData?.user.name}</h1>
        <p>Tu dirección: {userData?.user.address}</p>
        <p>Tu correo: {userData?.user.email}</p>
        <p>Tu teléfono: {userData?.user.phone}</p>
    </div>
  )
}

export default DashboardView