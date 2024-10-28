export interface CateAllRes {
  id: number
  name: string
  description: string
  image: string
}

export interface CateByIdRes {
  id: number
  code: string
  name: string
  description: string
  price: number
  rating: number
  image: string
  category_id: number
  mall_id: number
}