// Bentuk satu item todo dari API (sesuai JSON dari server)
export interface TodoApi {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}