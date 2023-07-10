export type Holiday = {
  id?: number;
  startDate: string;
  endDate: string;
  remainingDays: number;
  vacationWorkdays: number;
  reason: string;
  confirmation1: boolean;
  confirmation2: boolean;
  replacement: string;
  status: string;
};
