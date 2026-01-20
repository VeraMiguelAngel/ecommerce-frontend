export interface ICardsProps {
    id: number;
    name: string;
    image: string;
    price: number
}

export interface IProductDetailPageProps {
    params: Promise<{ productId: string }>
}