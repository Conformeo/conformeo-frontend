import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../../models/equipment.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipmentApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>('/api/equipments/');
  }
  getById(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`/api/equipments/${id}`);
  }
  add(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>('/api/equipments', equipment);
  }
  update(equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`/api/equipments/${equipment.id}`, equipment);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`/api/equipments/${id}`);
  }
}
