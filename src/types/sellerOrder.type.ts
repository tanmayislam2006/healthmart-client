// src/types/order.ts
export type OrderStatus = "PLACED" | "SHIPPED" | "DELIVERED";

export type SellerOrderItem = {
  id: string;
  quantity: number;
  price: number; 
  medicine: {
    name: string;
    category?: {
      name: string;
    };
  };
};

export type SellerOrder = {
  id: string;
  address: string;
  total: string;
  status: OrderStatus;
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
  orderItems: SellerOrderItem[];
};
