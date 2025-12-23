export interface Comment {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  avatar?: string;
  text: string;
  date: string;
  replies?: Comment[];
}
