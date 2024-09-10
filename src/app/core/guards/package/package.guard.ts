import { CanActivateFn } from '@angular/router';

export const packageGuard: CanActivateFn = (route, state) => {
  return true;
};
