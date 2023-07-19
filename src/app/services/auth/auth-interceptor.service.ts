import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        
        if (!user) {
          return next.handle(req);
        }
        console.log(user.token);

        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${user.token}`
        );
        const modifiedReq = req.clone({ headers });

        // Continue with the modified request
        return next.handle(modifiedReq);
      })
    );
  }
}
