export type CartItemType = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    size: number,
    type: string,
    count: number,
}

export interface CartSliceState {
    totalPrice: number,
    items: CartItemType[],
}
