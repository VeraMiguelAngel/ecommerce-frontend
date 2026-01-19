/* eslint-disable @next/next/no-img-element */
import { ICardsProps } from "@/types/propsTypes";


const Card: React.FC<ICardsProps> = ({name, price, image}) => {
    return (
        <div>
            <h2>{name}</h2>
            <img src={image} alt="Imágen del producto"/>
            <p>Precio: {price}</p>
        </div>
    )

}

export default Card;