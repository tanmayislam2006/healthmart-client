
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
