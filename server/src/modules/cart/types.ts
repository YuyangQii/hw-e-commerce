export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
};

export type Cart = {
  userId: number;
  items: CartItem[];
  total: number;
};
