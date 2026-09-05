export interface Transaction {
  id: number;
  user_id: string;
  avatar: string | null;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
  created_at: string;
}
