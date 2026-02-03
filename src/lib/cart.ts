const CART_KEY = "healthmart_cart";

export interface CartItem {
  medicineId: string;
  name: string;
  price: number;
  quantity: number;
}

export const cartStorage = {
  get(): CartItem[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  },

  set(items: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  },

  add(item: CartItem) {
    const cart = this.get();
    const existing = cart.find((i) => i.medicineId === item.medicineId);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }

    this.set(cart);
  },

  remove(medicineId: string) {
    this.set(this.get().filter((i) => i.medicineId !== medicineId));
  },

  updateQuantity(medicineId: string, quantity: number) {
    const safeQuantity = Math.max(1, quantity);
    const cart = this.get().map((item) =>
      item.medicineId === medicineId
        ? { ...item, quantity: safeQuantity }
        : item
    );

    this.set(cart);
  },

  clear() {
    localStorage.removeItem(CART_KEY);
  },
};
