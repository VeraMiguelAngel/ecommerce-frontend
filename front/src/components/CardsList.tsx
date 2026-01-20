import { getProductsDB } from "@/services/productService";
import Card from "./Card";

const CardsList = async () => {
  const productsDB = await getProductsDB();
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8 text-center">
        Catálogo de productos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {productsDB.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default CardsList;
