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
      const productExist = cart.some((product: IProducts) => product.id === id);
      if(productExist) {
        alert('Ya tienes este producto en el carrito');
        router.push('/');
      } else {
        cart.push(
          {id, name, image, price, stock, description}
        );
        localStorage.setItem('cart', JSON.stringify(cart)); 
        alert('Producto agregado al carrito.');
        router.push('/');
      }
    } else {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      router.push('/login');
    }
  }
        
  return (
    <div>
        <h1>{name}</h1>
        <img src={image} alt={`Imágen del producto ${name}`} />
        <p>Descripción: {description}</p>
        <p>Cantidad: {stock}</p>
        <p>Precio: ${price}</p>
        <button onClick={handleAddToCart} className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300" >
        Agregar al carrito
      </button>
    </div>
  )
}

export default ProductDetailView