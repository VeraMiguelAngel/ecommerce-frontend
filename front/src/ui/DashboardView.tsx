'use client';

import { useAuth } from "@/context/AuthContext";

const DashboardView = () => {
  const { userData } = useAuth();

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Perfil de usuario</h1>
      <p className="mb-2">Nombre: {userData?.user.name}</p>
      <p className="mb-2">Dirección: {userData?.user.address || "No registrada"}</p>
      <p className="mb-2">Correo: {userData?.user.email}</p>
      <p className="mb-2">Teléfono: {userData?.user.phone || "No registrado"}</p>
    </div>
  );
};

export default DashboardView;
