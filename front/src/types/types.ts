export interface IProducts {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number
}

export interface ILoginProps {
    email: string
    password: string
}

export interface ILoginErrors {
    email?: string
    password?: string
}

export interface IRegisterProps {
    email: string
    password: string
    address: string
    name: string
    phone: string
}

export interface IUserSession {
    token: string
    user: {
        id: number
        name: string
        address: string
        phone: number
        email: string
        orders: []
    }
}

export interface IOrder {
    id: number
    date: Date
    status: string
    products: IProducts[]
}
