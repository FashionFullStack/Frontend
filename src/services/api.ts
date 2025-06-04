import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // Important for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: 'mens_clothing' | 'womens_clothing' | 'kids_clothing' | 'traditional' | 'accessories';
  subCategory: string;
  price: {
    regular: number;
    sale: number;
    wholesale: number;
  };
  sizes: string[];
  colors: string[];
  images: string[];
  stockQuantity: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
}

export interface Wishlist {
  name: string;
  description: string;
  isPublic: boolean;
}

export const auth = {
  googleLogin: () => {
    window.location.href = `${API_URL}/auth/google`;
  },

  logout: async () => {
    await api.post('/auth/logout');
    Cookies.remove('token');
    window.location.href = '/login';
  }
};

export const products = {
  getAll: async (params?: {
    sort?: 'newest' | 'price_low' | 'price_high';
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get<{
      products: Product[];
      total: number;
      page: number;
      totalPages: number;
    }>('/products', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  }
};

export const cart = {
  get: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  addItem: async (item: CartItem) => {
    const response = await api.post('/cart/add', item);
    return response.data;
  },

  updateItem: async (itemId: string, quantity: number) => {
    const response = await api.patch(`/cart/items/${itemId}`, { quantity });
    return response.data;
  },

  removeItem: async (itemId: string) => {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data;
  },

  clear: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  }
};

export const orders = {
  create: async (orderData: Order) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }
};

export const wishlist = {
  create: async (data: Wishlist) => {
    const response = await api.post('/wishlist', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/wishlist');
    return response.data;
  },

  addProduct: async (wishlistId: string, productId: string) => {
    const response = await api.post(`/wishlist/${wishlistId}/products/${productId}`);
    return response.data;
  },

  removeProduct: async (wishlistId: string, productId: string) => {
    const response = await api.delete(`/wishlist/${wishlistId}/products/${productId}`);
    return response.data;
  }
};

export default api; 