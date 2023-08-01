import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Holiday } from 'src/app/models/holiday';
import { AuthResponseData } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private baseUrl: string = 'http://localhost:8080/api/holidays';
  private baseUrlForUser: string = 'http://localhost:8080/api/users/holidays';

  constructor(private http: HttpClient) {}

  saveHoliday(id: number, holiday: Holiday): Observable<Holiday> {
    const url = `${this.baseUrlForUser}?userId=${id}`;
    return this.http.post<Holiday>(url, holiday);
  }

  getHolidays(id: number): Observable<Holiday[]> {
    const url = `${this.baseUrlForUser}?userId=${id}`;
    return this.http.get<Holiday[]>(url);
  }

  updateHoliday(holiday: Holiday, id: number): Observable<Holiday> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Holiday>(url, holiday);
  }

  deleteHoliday(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
