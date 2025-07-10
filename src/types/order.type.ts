

export type Order = {
    externalId: string;
    status: string;
    payment_status: string;
    total: number;
    createdAt: string;
    customerName: string;
}


export type OrderProduct = {
    orderExternalId: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
}
