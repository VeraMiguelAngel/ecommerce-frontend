import { getProductsByID } from "@/services/productService";
import { IProductDetailPageProps } from "@/types/propsTypes";
import ProductDetailView from "@/ui/ProductDetailView";


const productDetailPage: React.FC<IProductDetailPageProps> = async ({ params }) => {
    const { productId } = await params;
    const productDetail = await getProductsByID(productId);
  return (
    
    <ProductDetailView {...productDetail}/>
  )
}

export default productDetailPage