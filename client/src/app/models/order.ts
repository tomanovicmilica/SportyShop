export interface Order {
  orderId: number
  buyerId: string
  shippingAddress: ShippingAddress
  methodId: number
  subtotal: number
  additionalExpenses: number
  orderDate: string
  orderStatus: string
  total: number
  orderItems: OrderItem[]
}

export interface ShippingAddress {
  fullName: string
  address1: string
  address2: string
  address3: string
  city: string
  zip: number
  country: string
}

export interface OrderItem {
  productId: number
  name: string
  imageUrl: string
  price: number
  sizeId: number
  quantity: number
}
