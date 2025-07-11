import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canActivateAuth: CanActivateFn = () => {
  const loggedIn = true; // check ton auth service
  if (!loggedIn) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
