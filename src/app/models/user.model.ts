import { Role } from './role';

export class User {
  constructor(
    public id: number,
    public role: Role,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
  password: string;
  userDetail: UserDetail;
  vacationDays: VacationDays;
  holidays: Holiday[];
}

export interface UserDetail {
  id: number;
  address: string;
  phoneNumber: string;
  email: string;
}

export interface VacationDays {
  id: number;
  totalVacation: number;
}

export interface Holiday {
  id: number;
  startDate: string;
  endDate: string;
  vacationWorkdays: number;
  reason: string;
  confirmation1: boolean;
  confirmation2: boolean;
  replacement: string;
  status: string;
}
