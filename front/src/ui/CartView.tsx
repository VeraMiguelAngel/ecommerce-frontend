'use client'

import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/services/orderService";
import { IProducts } from "@/types/types";
import { useEffect, useState } from "react"

const CartView = () => {
    const {userData} = useAuth();
    const [cart, setCart] = useState<IProducts[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        if(storedCart) {
            let totalPrice = 0;
            storedCart.map((product: IProducts) => {
                totalPrice = totalPrice + product.price;
            });
            setTotal(totalPrice);
            setCart(storedCart);
        }
    }, []);

    const handleCheckout = async () => {
        if(userData?.token) {
            const idProducts = cart?.map((product) => product.id) ?? [];
            await createOrder(userData.token, idProducts);
            localStorage.setItem('cart', '[]');
            setCart([]);
            setTotal(0);
        }
    }
  return (
    <div>
        <div>
            {
                cart?.length ?
                cart.map((product) => {
                    return (
                        <div key={product.id}>
                            <p>Producto: {product.name}</p>
                            <p>Precio: ${product.price}</p>
                        </div>
                    )
                }) : (
                    <div>
                        <p>No tienes prodcutos en el carrito de compras</p>
                    </div>
                )
            }
        </div>

        <div>
            <p>Total: ${total}</p>
            <button disabled={cart?.length < 0 ? true : false} onClick={handleCheckout}>Comprar</button>
        </div>
        
    </div>
  )
}

export default CartView