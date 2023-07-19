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

  constructor(private http: HttpClient) {}

  saveHoliday(holiday: Holiday): Observable<Holiday> {
    return this.http.post<Holiday>(this.baseUrl, holiday);
  }

  getHolidays(): Observable<Holiday[]> {
    //getting data as string
    const jsonData = sessionStorage.getItem('data');

    //converting to object
    const objectData = jsonData !== null ? JSON.parse(jsonData) : null;
    console.log('Token: ', objectData.token);

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${objectData.token}`
    );

    return this.http.get<Holiday[]>(this.baseUrl, { headers });
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
