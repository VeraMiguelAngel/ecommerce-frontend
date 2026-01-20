'use client';

import { useAuth } from "@/context/AuthContext";
import { getOrders } from "@/services/orderService";
import { IOrder } from "@/types/types";
import { useEffect, useState } from "react";

const DashboardOrders = () => {
  const { userData } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userData) return;
      try {
        const orders = await getOrders(userData.token);
        setOrders(orders);
      } catch {
        alert("Error al obtener las órdenes");
      }
    };
    fetchOrders();
  }, [userData]);

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Mis compras</h1>

      {orders.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-[0_0_20px_white] transition duration-300"
            >
              <p className="font-semibold text-lg mb-2">
                Orden N°: {order.id}
              </p>
              <p className="text-gray-300 mb-1">
                Estado:{" "}
                <span
                  className={
                    order.status === "approved"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {order.status === "approved" ? "Aprobada" : "Rechazada"}
                </span>
              </p>
              <p className="text-gray-300 mb-3">
                Fecha: {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="font-medium mb-2">Productos:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                {order.products.map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-10">
          <p>Aún no tienes compras realizadas</p>
          <button
            onClick={() => window.location.href = "/"}
            className="mt-6 bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_white] transition duration-300"
          >
            Volver al catálogo
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardOrders;
