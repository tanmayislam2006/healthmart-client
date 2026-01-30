export type Category = {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "DISABLED";
};

export const categories: Category[] = [
  {
    id: "1",
    name: "Pain Relief",
    description: "Headache, fever & pain management",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Heart Health",
    description: "Support cardiovascular wellness",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Brain & Memory",
    description: "Improve focus and mental clarity",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "Bone & Joint",
    description: "Strengthen bones and joints",
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "Eye Care",
    description: "Vision and eye protection",
    status: "ACTIVE",
  },
  {
    id: "6",
    name: "Baby Care",
    description: "Health essentials for babies",
    status: "ACTIVE",
  },
  {
    id: "7",
    name: "Natural",
    description: "Herbal and natural remedies",
    status: "ACTIVE",
  },
  {
    id: "8",
    name: "Vitamins",
    description: "Daily health supplements",
    status: "ACTIVE",
  },
];
