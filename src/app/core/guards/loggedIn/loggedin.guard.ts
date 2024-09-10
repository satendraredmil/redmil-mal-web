import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedinGuard: CanActivateFn = (route, state) => {

 

    

    // if (token) {
    //   // Token hai to user ko dashboard par jaane do
    //   return true;
    // } else {
    //   // Token nahi hai to user ko login page par wapas redirect karo
    //   router.navigate(['/login']);
    //   return false;
    // }
  

  
  const _router = inject(Router);

  let myAccessToken = sessionStorage.getItem('UserLogintoken')
  if (!myAccessToken) {
    // If token exists, user is already logged in, so prevent access to login page
    _router.navigate(['/login']); // Redirect to dashboard or other protected route
    return false;
  } else {
    // If no token, allow access to login page
    return true;
  }
}