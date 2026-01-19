
import { getProductsDB } from "@/services/productService"
import Card from "./Card"
import Link from "next/link";


const CardsList = async () => {
  const productsDB = await getProductsDB();
  return (
    <div>
    {
        productsDB.map((product) => {
            return (
              <Link href={`/product/${product.id}`} key={product.id}>
                <Card key={product.id} {...product} />
              </Link>
            )
        })
    }
    </div>
  )
}

export default CardsList