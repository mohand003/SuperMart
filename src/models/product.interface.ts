export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  isOffer?: boolean;
  offerText?: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}