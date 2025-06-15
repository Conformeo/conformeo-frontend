import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // ex. si pas connecté, rediriger
  const isLogged = /* votre AuthService ici */;
  if (!isLogged) {
    // utilisez un Router importé ici pour rediriger
    return false;
  }
  return true;
};
