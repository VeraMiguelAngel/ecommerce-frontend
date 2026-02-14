/* eslint-disable @next/next/no-img-element */
'use client'
import { useAuth } from "@/context/AuthContext"
import { IProducts } from "@/types/types"
import { useRouter } from "next/navigation";

const ProductDetailView: React.FC<IProducts> = ({id, name, image, price, stock, description}) => {
  const { userData } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
  if (userData?.token) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productExist = cart.some((product: IProducts) => String(product.id) === String(id));

    if (productExist) {
      alert('Ya tienes este producto en el carrito');
      router.push('/carrito');
    } else {
      cart.push({ id, name, image, price, stock, description });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Producto agregado al carrito.');
      router.push('/carrito');
    }
  } else {
    alert('Debes iniciar sesión para agregar productos al carrito.');
    router.push('/login');
  }
};

        
  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="flex items-center justify-center bg-gray-800 rounded-lg">
          <img src={image} alt={`Imagen del producto ${name}`} className="max-h-80 object-contain rounded-lg" />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-gray-300 mb-2">Descripción: {description}</p>
          <p className="text-gray-400 mb-2">Cantidad disponible: {stock}</p>
          <p className="text-xl font-semibold text-white mb-6">Precio: ${price}</p>

          {/* Botones */}
          <div className="flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_white] transition duration-300"
            >
              Agregar al carrito
            </button>

            
            <button
              onClick={() => router.push("/")}
              className="w-full bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_white] transition duration-300"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailView;

