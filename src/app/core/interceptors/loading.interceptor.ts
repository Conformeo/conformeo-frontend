import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject }                         from '@angular/core';
import { finalize }                       from 'rxjs';
import { LoaderService }                  from '../services/loader.service';

/**
 * Affiche un loader global pendant toute la durée de la requête HTTP.
 * (exclut les requêtes `reportProgress` utilisées pour les uploads.)
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  // facultatif : ne pas afficher le spinner pour les uploads/long polling
  const skip = (req as HttpRequest<unknown>).reportProgress;

  if (!skip) {
    // setTimeout 0 ms pour laisser Angular stabiliser la vue avant d’afficher
    setTimeout(() => loader.show(), 0);
  }

  return next(req).pipe(
    finalize(() => {
      if (!skip) loader.hide();
    }),
  );
};
