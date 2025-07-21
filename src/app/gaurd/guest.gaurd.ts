import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const guestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If not authenticated, try refreshing token
  if (!authService.isAuthenticated()) {
    return authService.refreshToken().pipe(
      map(response => {
        authService.setAccessToken(response.accessToken);
        authService.setUser(response.user);

        if (response.user.role === 'Admin') {
          router.navigate(['/admin/dashboard']);
        } else {
          router.navigate(['/home']);
        }
        return false;
      }),
      catchError(() => {
        // No valid refresh token — allow guest access
        return of(true);
      })
    );
  }

  // Already authenticated — redirect based on role
  const role = authService.getUserRole();
  if (role === 'Admin') {
    router.navigate(['/admin/dashboard']);
  } else {
    router.navigate(['/home']);
  }
  return of(false);
};
