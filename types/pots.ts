export interface Pot {
  id: number;
  user_id: string;
  name: string;
  target: number;
  total: number;
  theme: string | null;
  created_at: string;
}
