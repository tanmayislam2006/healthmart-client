
export type Medicine = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  categoryId: string;
  category?: {
    name: string;
  };
};


export type MedicineResponse = {
  id: string;
  sellerId: string;
  categoryId: string;

  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;

  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;

  category: {
    id: string;
    name: string;
  };

  seller: {
    id: string;
    name: string;
    email: string;
  };
};
