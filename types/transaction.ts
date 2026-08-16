export interface Transaction {
  id: number;
  user_id: string;
  avatar: string | null;
  name: string;
  category: string;
  date: string; // ISO date string from Supabase
  amount: number;
  recurring: boolean;
  created_at: string;
}

export interface TransactionWithCategory extends Transaction {
  // Extend if needed
}
