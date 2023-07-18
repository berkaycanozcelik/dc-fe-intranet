import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { LoginData } from 'src/app/models/loginData';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user.model';

export interface AuthResponseData {
  id: string;
  role: string;
  token: string;
  expirationDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  private baseUrl: string = 'http://localhost:8080/api/auth';

  login(email: string, password: string): Observable<any> {
    const loginData: LoginData = {
      email: email,
      password: password,
    };
    return (
      this.http
        .post<AuthResponseData>(`${this.baseUrl}/authenticate`, loginData)

        /* 
    **
     TODO: add more error handling after backend is ready
    **
    */
        .pipe(
          catchError((errorRes) => {
            let errorMessage = 'An Error occurred';

            if (!errorRes.status) {
              errorMessage = 'An unknown Error occurred';
              return throwError(errorMessage);
            }

            switch (errorRes.status) {
              case 403:
                errorMessage = 'Authentication failed';
                break;
              case 404:
                errorMessage = 'Server is offline';
                break;
            }
            return throwError(errorMessage);
          }),
          tap((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expirationDate
            );
            const user = new User(
              resData.id,
              resData.role === 'USER' ? Role.USER : Role.ADMIN,
              resData.token,
              expirationDate
            );
            this.user.next(user);
          })
        )
    );
  }
}
