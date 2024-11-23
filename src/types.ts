export interface Category {
  id: string;
  type: 'income' | 'expense';
  name: string;
}

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  createdAt: Date;
}