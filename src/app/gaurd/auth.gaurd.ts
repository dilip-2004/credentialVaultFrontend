import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=> {
const authService = inject(AuthService);
  const router = inject(Router);

  const targetRoute = state.url;
  
  const redirectBasedOnRole = (role: string | null) => {
    if (role === 'Admin') {
      if (!targetRoute.startsWith('/admin')) {
        router.navigate(['/admin']);
        return false;
      }
      return true;
    }

    if (role === 'User') {
      if (targetRoute.startsWith('/admin')) {
        router.navigate(['/home']);
        return false;
      }
      return true;
    }

    router.navigate(['/auth/login']);
    return false;
  };

  if (authService.isAuthenticated()) {
    const role = authService.getUserRole();
    return of(redirectBasedOnRole(role));
  }

  return authService.refreshToken().pipe(
    map(response => {
      authService.setAccessToken(response.accessToken);
      authService.setUser(response.user);
      return redirectBasedOnRole(response.user.role);
    }),
    catchError(() => {
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
