import { Injectable } from '@angular/core';
import { EquipmentApi } from '../api/equipment.api';
import { Equipment } from '../../models/equipment.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

const STORAGE_KEY = 'conformeo_equipments';

function getFromStorage(): Equipment[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) as Equipment[] : [];
}
function setToStorage(list: Equipment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

@Injectable({ providedIn: 'root' })
export class EquipmentService {
  constructor(private api: EquipmentApi) {}

  getAll(): Observable<Equipment[]> {
    if (environment.useMock) return of(getFromStorage());
    return this.api.getAll();
  }
  getById(id: string): Observable<Equipment | undefined> {
    if (environment.useMock) return of(getFromStorage().find(e => e.id === id));
    return this.api.getById(id);
  }
  add(equipment: Equipment): Observable<Equipment> {
    if (environment.useMock) {
      const list = getFromStorage();
      list.push(equipment);
      setToStorage(list);
      return of(equipment);
    }
    return this.api.add(equipment);
  }
  update(equipment: Equipment): Observable<Equipment> {
    if (environment.useMock) {
      const list = getFromStorage();
      const idx = list.findIndex(e => e.id === equipment.id);
      if (idx >= 0) list[idx] = equipment;
      setToStorage(list);
      return of(equipment);
    }
    return this.api.update(equipment);
  }
  delete(id: string): Observable<void> {
    if (environment.useMock) {
      let list = getFromStorage();
      list = list.filter(e => e.id !== id);
      setToStorage(list);
      return of(undefined); // ✅ Corrigé ici
    }
      return this.api.delete(id);
    }
  }
