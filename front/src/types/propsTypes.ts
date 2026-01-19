export interface ICardsProps {
    name: string;
    image: string;
    price: number
}

export interface IProductDetailPageProps {
    params: Promise<{ productId: string }>
}