export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}
