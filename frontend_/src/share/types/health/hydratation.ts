export interface Hydration {
  id: number;
  user: number;
  quantity: number;
  date: string;
}

export interface HydrationWrite {
  quantity: number;
  date: string;
}
