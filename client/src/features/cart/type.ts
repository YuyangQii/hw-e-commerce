export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total: number;
}