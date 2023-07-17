import { Role } from './role';

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
  password: boolean;
};
