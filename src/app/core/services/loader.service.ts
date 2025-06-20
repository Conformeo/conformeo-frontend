// src/app/core/services/loader.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _count = 0;
  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();

  show() { this._set(++this._count); }
  hide() { this._set(--this._count); }

  private _set(count: number) {
    this._count = Math.max(0, count);
    this._loading.next(this._count > 0);
  }
}
