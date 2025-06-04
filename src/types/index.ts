export type UserRole = 'admin' | 'store' | 'consumer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  measurements?: UserMeasurements;
  createdAt: string;
  updatedAt: string;
}

export interface UserMeasurements {
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  inseam: number;
  shoulder: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  b2bPrice: number;
  images: string[];
  category: string;
  gender: 'male' | 'female' | 'unisex';
  sizes: string[];
  colors: string[];
  stock: number;
  storeId: string;
  rating: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: 'esewa' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Store {
  id: string;
  name: string;
  ownerId: string;
  description: string;
  logo: string;
  address: Address;
  rating: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
} 