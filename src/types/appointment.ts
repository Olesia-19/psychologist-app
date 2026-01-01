export interface Appointment {
  name: string;
  phone: string;
  email: string;
  time: string;
  comment: string;
  psychologistId?: string;
  userId?: string;
  createdAt: number;
}
