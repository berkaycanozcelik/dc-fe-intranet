import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
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
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

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
            const expirationDate = new Date(+resData.expirationDate);
            const user = new User(
              resData.id,
              resData.role === 'USER' ? Role.USER : Role.ADMIN,
              resData.token,
              expirationDate
            );
            sessionStorage.setItem('data', JSON.stringify(resData));
            this.user.next(user);
            this.autoLogout(+resData.expirationDate - new Date().getTime());
          })
        )
    );
  }

  autoLoginWithSessionStorage() {
    const data = sessionStorage.getItem('data');

    if (data == undefined) {
      return;
    }

    const userData: {
      id: string;
      role: string;
      token: string;
      expirationDate: string;
    } = data ? JSON.parse(data) : {};

    const loadedUser = new User(
      userData.id,
      userData.role === 'USER' ? Role.USER : Role.ADMIN,
      userData.token,
      new Date(userData.expirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        +userData.expirationDate - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    sessionStorage.removeItem('data');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
