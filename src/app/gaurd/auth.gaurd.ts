import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export const authGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=> {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return handleRole(authService.getUserRole(), router);
  }

  return authService.refreshToken().pipe(
    map(response => {
      authService.setAccessToken(response.accessToken);
      authService.setUser(response.user);
      return response.user.role;
    }),
    switchMap(role => handleRole(role, router)),
    catchError(() => {
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};

function handleRole(role: string | null, router: Router) {
  if (role === 'User') return of(true);
  if (role === 'Admin') {
    router.navigate(['/admin']);
    return of(false);
  }

  router.navigate(['/auth/login']);
  return of(false);
}
