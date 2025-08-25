import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../features/services/auth/auth';
import { map } from 'rxjs';

export const publicGuardGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuth => {
      if (isAuth) {
        router.navigate(['']); 
        return false;
      }
      return true; 
    })
  );
};
