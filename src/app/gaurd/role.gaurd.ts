import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];
  const userRole = authService.getUserRole();

  if (userRole === expectedRole) {
    return true;
  } else {
    if (userRole === 'User') {
      router.navigate(['/home']);
    } else {
      router.navigate(['/auth/login']);
    }
    return false;
  }
};
