import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Holiday } from 'src/app/models/holiday';

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
    return this.http.get<Holiday[]>(this.baseUrl);
  }

  updateHoliday(holiday: Holiday, id: number): Observable<Holiday> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Holiday>(url, holiday);
  }
}
