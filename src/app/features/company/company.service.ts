import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FireExtinguisher } from '../../models/fire-extinguisher.model';
import { Certification } from '../../models/certification.model';
import { Camera } from '../../models/camera.model';
import { FirstAidKit } from '../../models/first-aid-kit.model';
import { Insurance } from '../../models/insurance.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private keys = {
    extinguishers: 'conformeo_extinguishers',
    certifications: 'conformeo_certifications',
    cameras:       'conformeo_cameras',
    kits:          'conformeo_kits',
    insurances:    'conformeo_insurances',
  };

  private getList<T>(key: string): T[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  private setList<T>(key: string, value: T[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Extincteurs
  getExtinguishers(): Observable<FireExtinguisher[]> {
    let list = this.getList<FireExtinguisher>(this.keys.extinguishers);
    if (!list.length) {
      list = [
        {
          id: '1', location: 'Local technique', serialNumber: 'AB123456',
          lastControl: '2024-06-01', nextControl: '2025-06-01', status: 'OK',
        },
        {
          id: '2', location: 'Entrepôt', serialNumber: 'CD654321',
          lastControl: '2023-12-15', nextControl: '', status: 'TO_SCHEDULE',
        }
      ];
      this.setList(this.keys.extinguishers, list);
    }
    return of(list);
  }
  addExtinguisher(ext: FireExtinguisher) {
    const list = this.getList<FireExtinguisher>(this.keys.extinguishers);
    ext.id = Math.random().toString(36).slice(2,9);
    list.push(ext);
    this.setList(this.keys.extinguishers, list);
    return of(null);
  }
  updateExtinguisher(ext: FireExtinguisher) {
    let list = this.getList<FireExtinguisher>(this.keys.extinguishers);
    list = list.map(e => e.id === ext.id ? ext : e);
    this.setList(this.keys.extinguishers, list);
    return of(null);
  }
  deleteExtinguisher(id: string) {
    let list = this.getList<FireExtinguisher>(this.keys.extinguishers);
    list = list.filter(e => e.id !== id);
    this.setList(this.keys.extinguishers, list);
    return of(null);
  }

  // Certifications
  getCertifications(): Observable<Certification[]> {
    return of(this.getList<Certification>(this.keys.certifications));
  }
  addCertification(cert: Certification) {
    const list = this.getList<Certification>(this.keys.certifications);
    cert.id = Math.random().toString(36).slice(2,9);
    list.push(cert);
    this.setList(this.keys.certifications, list);
    return of(null);
  }
  updateCertification(cert: Certification) {
    let list = this.getList<Certification>(this.keys.certifications);
    list = list.map(c => c.id === cert.id ? cert : c);
    this.setList(this.keys.certifications, list);
    return of(null);
  }
  deleteCertification(id: string) {
    let list = this.getList<Certification>(this.keys.certifications);
    list = list.filter(c => c.id !== id);
    this.setList(this.keys.certifications, list);
    return of(null);
  }

  // Caméras
  getCameras(): Observable<Camera[]> {
    return of(this.getList<Camera>(this.keys.cameras));
  }
  addCamera(cam: Camera) {
    const list = this.getList<Camera>(this.keys.cameras);
    cam.id = Math.random().toString(36).slice(2,9);
    list.push(cam);
    this.setList(this.keys.cameras, list);
    return of(null);
  }
  updateCamera(cam: Camera) {
    let list = this.getList<Camera>(this.keys.cameras);
    list = list.map(c => c.id === cam.id ? cam : c);
    this.setList(this.keys.cameras, list);
    return of(null);
  }
  deleteCamera(id: string) {
    let list = this.getList<Camera>(this.keys.cameras);
    list = list.filter(c => c.id !== id);
    this.setList(this.keys.cameras, list);
    return of(null);
  }

  // Kits
  getKits(): Observable<FirstAidKit[]> {
    return of(this.getList<FirstAidKit>(this.keys.kits));
  }
  addKit(kit: FirstAidKit) {
    const list = this.getList<FirstAidKit>(this.keys.kits);
    kit.id = Math.random().toString(36).slice(2,9);
    list.push(kit);
    this.setList(this.keys.kits, list);
    return of(null);
  }
  updateKit(kit: FirstAidKit) {
    let list = this.getList<FirstAidKit>(this.keys.kits);
    list = list.map(k => k.id === kit.id ? kit : k);
    this.setList(this.keys.kits, list);
    return of(null);
  }
  deleteKit(id: string) {
    let list = this.getList<FirstAidKit>(this.keys.kits);
    list = list.filter(k => k.id !== id);
    this.setList(this.keys.kits, list);
    return of(null);
  }

  // Assurances
  getInsurances(): Observable<Insurance[]> {
    return of(this.getList<Insurance>(this.keys.insurances));
  }
  addInsurance(ins: Insurance) {
    const list = this.getList<Insurance>(this.keys.insurances);
    ins.id = Math.random().toString(36).slice(2,9);
    list.push(ins);
    this.setList(this.keys.insurances, list);
    return of(null);
  }
  updateInsurance(ins: Insurance) {
    let list = this.getList<Insurance>(this.keys.insurances);
    list = list.map(i => i.id === ins.id ? ins : i);
    this.setList(this.keys.insurances, list);
    return of(null);
  }
  deleteInsurance(id: string) {
    let list = this.getList<Insurance>(this.keys.insurances);
    list = list.filter(i => i.id !== id);
    this.setList(this.keys.insurances, list);
    return of(null);
  }
}
