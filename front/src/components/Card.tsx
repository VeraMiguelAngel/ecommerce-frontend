/* eslint-disable @next/next/no-img-element */
import { ICardsProps } from "@/types/propsTypes";
import Link from "next/link";

const Card: React.FC<ICardsProps> = ({ id, name, price, image }) => {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg hover:shadow-[0px_0px_25px_6px] hover:shadow-white/50 transition transform hover:-translate-y-1 p-4 cursor-pointer">
      <div className="w-full h-48 flex items-center justify-center bg-gray-800 rounded-lg mb-4">
        <img
          src={image}
          alt={`Imagen de ${name}`}
          className="max-h-full max-w-full object-contain rounded-lg"
        />
      </div>
      <h2 className="text-lg font-semibold text-white mb-2">{name}</h2>
      <p className="text-gray-300 mb-4">Precio: ${price}</p>
      <Link href={`/product/${id}`}>
        <button className="w-full bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-[0px_0px_30px_14px] hover:shadow-white/70 transition duration-300">
          Ver detalle
        </button>
      </Link>
    </div>
  );
};

export default Card;


