import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

export const signupGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If user is already authenticated, redirect based on role
  if (authService.isAuthenticated()) {
    const role = authService.getUserRole();
    if (role === 'Admin') {
      router.navigate(['/admin/dashboard']);
    } else {
      router.navigate(['/home']);
    }
    return of(false);
  }

  // Allow access only if query params contain both 'email' and 'name'
  const { email, name } = route.queryParams;
  if (email && name) {
    return of(true);
  }

  // Otherwise redirect to email verification
  router.navigate(['/auth/email-verification']);
  return of(false);
};
