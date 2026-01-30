export type FeaturedProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
};

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "1",
    name: "Vitamin D3 1000IU",
    description: "Essential vitamin for bone and immune health.",
    price: 12.99,
    stock: 150,
    category: "Vitamins",
  },
  {
    id: "2",
    name: "Omega-3 Fish Oil",
    description: "Supports heart and brain health.",
    price: 24.99,
    stock: 89,
    category: "Heart Health",
  },
  {
    id: "3",
    name: "Ibuprofen 400mg",
    description: "Fast relief from pain and fever.",
    price: 8.99,
    stock: 200,
    category: "Pain Relief",
  },
  {
    id: "4",
    name: "Melatonin 5mg",
    description: "Improves sleep quality naturally.",
    price: 14.99,
    stock: 120,
    category: "Brain & Memory",
  },
];
