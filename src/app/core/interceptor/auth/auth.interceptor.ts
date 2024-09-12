import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router);
  const userToken =localStorage.getItem('UserLogintoken') || sessionStorage.getItem('UserLogintoken'); // Get token from session storage

  if (userToken) {
    // Clone the request and add the authorization header
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${userToken}` }
    });
    return next(authReq);
  }else{
   _router.navigate(['/login']);
    return next(req);
  }

};
