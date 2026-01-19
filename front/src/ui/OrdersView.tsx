'use client'

import { useAuth } from "@/context/AuthContext"
import { getOrders } from "@/services/orderService";
import { IOrder } from "@/types/types";
import { useEffect, useState } from "react";

const OrdersView = () => {
    const {userData} = useAuth();
    const [orders, setOrders] = useState<IOrder[]>();
    const handleGetOrders = async () => {
        if(userData?.token) {
            const orders = await getOrders(userData.token);
            setOrders(orders);
        }
    }
    useEffect(() => {
        handleGetOrders()
    }, [userData]);
  return (
    <div>
        {
            orders?.length ?
                orders.map((order) => {
                    return (
                        <div key={order.id}>
                            <p>Orden N°: {order.id}</p>
                            <p>Estado: {order.status === 'approved' ? 'Aprobada' : 'Rechazada'}</p>
                            <p>Fecha: {new Date(order.date).toLocaleDateString()}</p>
                            <p>Productos:</p>
                            {
                                order.products.map((product) => {
                                    return (
                                        <div key={product.id}>
                                            <p>{product.name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }) : (
                    <div>
                        <p>Aún no tienes compras realizadas</p>
                    </div>
                )
        }
    </div>
  )
}

export default OrdersView