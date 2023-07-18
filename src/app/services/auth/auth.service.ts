import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginData } from 'src/app/models/loginData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = 'http://localhost:8080/api/auth';

  login(email: string, password: string): Observable<any> {
    const loginData: LoginData = {
      email: email,
      password: password,
    };
    return (
      this.http
        .post(`${this.baseUrl}/authenticate`, loginData)

        /* 
    **
     TODO: add more error handling after backend is ready
    **
    */
        .pipe(
          catchError((errorRes) => {
            let errorMessage = 'An Error occurred';

            if (!errorRes.status) {
              errorMessage = "An unknown Error occurred"
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
          })
        )
    );
  }
}
