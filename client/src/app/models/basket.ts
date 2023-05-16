export interface Basket {
    basketId: number
    buyerId: string
    items: Item[]
    subtotalPrice: number
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