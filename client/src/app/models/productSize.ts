export interface ProductSize {
    id: number
    size: Size
    sizeId: number
    product: Product
    productId: number
    quantityInStock: number
  }
  
  export interface Size {
    id: number
    sizeOfProduct: string
    productSizes: string[]
  }
  
  export interface Product {
    productId: number
    name: string
    price: number
    description: string
    imageUrl: string
    productType: ProductType
    productTypeId: number
    brand: Brand
    brandId: number
    productSizes: string[]
  }
  
  export interface ProductType {
    productTypeId: number
    name: string
  }
  
  export interface Brand {
    brandId: number
    name: string
  }
  