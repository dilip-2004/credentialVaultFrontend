import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export function authInterceptor ( req: HttpRequest<unknown>, next: HttpHandlerFn ) {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getAccessToken();

  const skipAuth =
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/register') ||
    req.url.includes('/refresh-token') ||
    req.url.includes('/send-verification-email') ||
    req.url.includes('/verify/');

  let authReq = req;
  if (token && !skipAuth) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !skipAuth && !req.url.includes('/credentials/decrypt')) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            authService.setAccessToken(response.accessToken);
            authService.setUser(response.user);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              },
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            authService.clearMethod();
            router.navigate(['/auth/login']);
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
