import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from 'src/app/models/loginData';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = 'http://localhost:8080/api/auth';

  login(email: string, password: string): Observable<any> {
    const loginData: LoginData = {
      email: email,
      password: password,
    };
    return this.http.post(`${this.baseUrl}/authenticate`, loginData);
  }
}
