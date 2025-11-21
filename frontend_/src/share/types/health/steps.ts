export interface Step {
  id: number;
  user: number;
  date: string;
  steps: number;
}

export interface StepWrite {
  date: string;
  steps: number;
}
