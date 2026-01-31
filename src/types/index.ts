export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  image?: string;
}

export interface Session {
  user: User;
  expires: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  category?: Category;
  seller?: User;
}

export interface OrderItem {
  medicine: Medicine;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user?: User;
  status: string;
  totalAmount: number;
  paymentStatus?: string;
  items?: OrderItem[];
  createdAt: string;
}

export interface SellerRequest {
  id: string;
  user: User;
  status: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: { message: string } | null;
}
