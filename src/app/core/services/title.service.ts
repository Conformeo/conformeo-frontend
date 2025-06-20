// src/app/core/services/title.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TitleService {
  readonly title$: Observable<string>;

  constructor(router: Router, route: ActivatedRoute) {
    this.title$ = router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        let r = route.firstChild;
        while (r?.firstChild) r = r.firstChild;
        return r?.snapshot.data['title'] ?? '';
      })
    );
  }
}
