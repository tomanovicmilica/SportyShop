export interface Basket {
    basketId: number;
    buyerId: string;
    items: Item[];
    subtotalPrice: number
    paymentIntentId?: string;
    clientSecret?: string;
  }
  
  export interface Item {
    productId: number
    name: string
    price: number
    description: string
    imageUrl: string
    sizeId: number
    quantity: number
  }