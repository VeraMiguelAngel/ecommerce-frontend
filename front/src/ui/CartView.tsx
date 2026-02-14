/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/services/orderService";
import { IProducts } from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartView = () => {
  const { userData } = useAuth();
  const [cart, setCart] = useState<IProducts[]>([]);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart) {
      const totalPrice = storedCart.reduce(
        (acc: number, product: IProducts) => acc + product.price,
        0
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTotal(totalPrice);
      setCart(storedCart);
    }
  }, []);

  const handleRemove = (id: number) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    const newTotal = updatedCart.reduce(
      (acc: number, product: IProducts) => acc + product.price,
      0
    );
    setTotal(newTotal);
    alert("Producto eliminado del carrito");
  };

  const handleCheckout = async () => {
    if (userData?.token) {
      try {
        const idProducts = cart.map((product) => product.id);
        await createOrder(userData.token, idProducts);
        alert("Orden creada con éxito");
        localStorage.setItem("cart", "[]");
        setCart([]);
        setTotal(0);
      } catch (error) {
        alert("Hubo un error al crear la orden");        
      }
    } else {
      alert("Debes iniciar sesión para finalizar la compra");
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Carrito de Compras</h1>

      <div className="space-y-4">
        {cart.length ? (
          cart.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center bg-gray-800 rounded-lg p-4"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-gray-400">Precio: ${product.price}</p>
              </div>
              {/* Botón eliminar con ícono */}
              <button
                onClick={() => handleRemove(product.id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Eliminar producto"
              >
                {/* Ícono de cesto de basura (SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-2-3h-2a1 1 0 00-1 1v1h4V5a1 1 0 00-1-1z"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">
            <p>No tienes productos en el carrito de compras</p>
          </div>
        )}
      </div>

      {/* Bloque de acciones */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xl font-semibold">Total: ${total}</p>
        <div className="flex gap-4">
          <button
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_white] transition duration-300 disabled:opacity-50"
          >
            Comprar
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_white] transition duration-300"
          >
            Agregar productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;


