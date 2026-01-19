/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProducts } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getProductsDB(): Promise<IProducts[]> {
    try {
        const response = await fetch(`${API_URL}/products`, {
            cache: 'no-cache'
        });
        const products: IProducts[] = await response.json();
        return products;
    } catch (error: any) {
        throw new Error(error);
    }
    
};

export async function getProductsByID(id: string): Promise<IProducts> {
    try {
        const response = await getProductsDB();
        const productByID = response.find((product) => product.id.toString() === id);
        if(!productByID) throw new Error('Producto no encontrado');
        return productByID;
    } catch (error: any) {
        throw new Error(error);
    }
    
};