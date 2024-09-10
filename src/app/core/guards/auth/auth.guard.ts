import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => { 
  
  const _router = inject(Router);

  let myAccessToken = sessionStorage.getItem('UserLogintoken')
  if (myAccessToken) {
    // If token exists, user is already logged in, so prevent access to login page
    _router.navigate(['/dashboard']); // Redirect to dashboard or other protected route
    return false;
  } else {
    // If no token, allow access to login page
    return true;
  }
  
};