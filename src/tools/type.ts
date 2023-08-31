//tipo para products
export type ProductType = {
    id: number,
    name: string,
    price: number,
    image: string,
    description: string
}

export type ProductCartType = {
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    quantity: number
}

export type OrderType = {
    user: string,
    products: ProductType[],
    quantity: number
}