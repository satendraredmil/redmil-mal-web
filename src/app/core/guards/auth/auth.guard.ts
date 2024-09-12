import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  debugger
  const _router = inject(Router);

  const localToken = localStorage.getItem('UserLogintoken');
  const sessionToken = sessionStorage.getItem('UserLogintoken');

  console.log('Local token:', localToken);
  console.log('Session ID:', sessionToken);
  // If token is present in localStorage and sessionStorage, allow access
  if (localToken && sessionToken) {
    debugger
    return true;
  }
 // If token is in localStorage but not in sessionStorage, user opened a new window
  if(localToken){
    return true;
  }
  // If token is in localStorage but not in sessionStorage, user opened a new window
  if (localToken && !sessionToken) {
    // Redirect to login page because it's a new window
    _router.navigate(['/login']);
    return false;
  }

  // If no token is found, redirect to login
  _router.navigate(['/login']);
  return false;

}
