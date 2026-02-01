import { OrderStatus } from "./sellerOrder.type";

export type OrderItem = {
  id: string;
  quantity: number;
  price: number
  medicine: {
    name: string;
    price: number;
  };
};

export type Order = {
  id: string;
  customerId: string;
  total: number;
  address: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
};
