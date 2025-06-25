import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// MODELS
import { FireExtinguisher } from '../../../../models/fire-extinguisher.model';
import { Certification } from '../../../../models/certification.model';
import { Camera } from '../../../../models/camera.model';
import { FirstAidKit } from '../../../../models/first-aid-kit.model';
import { Insurance } from '../../../../models/insurance.model';

// FORMS & MODALS
import { ExtinguisherFormComponent } from '../../components/extinguisher-form/extinguisher-form.component';
import { CertificationFormComponent } from '../../components/certification-form/certification-form.component';
import { CameraFormComponent } from '../../components/camera-form/camera-form.component';
import { KitFormComponent } from '../../components/kit-form/kit-form.component';
import { InsuranceFormComponent } from '../../components/insurance-form/insurance-form.component';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { TabGroupComponent } from '../../../../shared/tab/tab.component';

// APIs
import { ExtinguisherApi } from '../../../../core/api/extinguisher.api';
import { CertificationApi } from '../../../../core/api/certification.api';
import { CameraApi } from '../../../../core/api/camera.api';
import { KitApi } from '../../../../core/api/kit.api';
import { InsuranceApi } from '../../../../core/api/insurance.api';

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ExtinguisherFormComponent,
    CertificationFormComponent,
    CameraFormComponent,
    KitFormComponent,
    InsuranceFormComponent,
    ModalComponent
  ],
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss'],
})
export class CompanyPageComponent {

  // Onglets
  tabIndex = 0;
  tabNames = ['Extincteurs', 'Certifications', 'Caméras', 'Secours', 'Assurances'];

  // Extincteurs
  extinguishers: FireExtinguisher[] = [];
  searchExt = '';
  showExtModal = false;
  editingExt?: FireExtinguisher;
  showDeleteExtModal = false;

  // Certifications
  certifications: Certification[] = [];
  searchCert = '';
  showCertModal = false;
  editingCert?: Certification;
  showDeleteCertModal = false;

  // Caméras
  cameras: Camera[] = [];
  searchCam = '';
  showCamModal = false;
  editingCam?: Camera;
  showDeleteCamModal = false;

  // Trousses de secours
  kits: FirstAidKit[] = [];
  searchKit = '';
  showKitModal = false;
  editingKit?: FirstAidKit;
  showDeleteKitModal = false;

  // Assurances
  insurances: Insurance[] = [];
  searchIns = '';
  showInsModal = false;
  editingIns?: Insurance;
  showDeleteInsModal = false;

  constructor(
    private extinguisherApi: ExtinguisherApi,
    private certificationApi: CertificationApi,
    private cameraApi: CameraApi,
    private kitApi: KitApi,
    private insuranceApi: InsuranceApi,
  ) {
    this.reloadAll();
  }

  reloadAll() {
    this.extinguisherApi.list().subscribe(e => this.extinguishers = e);
    this.certificationApi.list().subscribe(c => this.certifications = c);
    this.cameraApi.list().subscribe(c => this.cameras = c);
    this.kitApi.list().subscribe(k => this.kits = k);
    this.insuranceApi.list().subscribe(i => this.insurances = i);
  }

  // Extincteurs
  openExtForm(ext?: FireExtinguisher) { this.editingExt = ext; this.showExtModal = true; }
  closeExtForm() { this.showExtModal = false; this.editingExt = undefined; }
  onExtSaved() { this.reloadAll(); this.closeExtForm(); }
  openDeleteExt(ext: FireExtinguisher) { this.editingExt = ext; this.showDeleteExtModal = true; }
  confirmDeleteExt() {
    if (this.editingExt) {
      this.extinguisherApi.remove(this.editingExt.id!).subscribe(() => this.reloadAll());
    }
    this.showDeleteExtModal = false; this.editingExt = undefined;
  }
  cancelDeleteExt() { this.showDeleteExtModal = false; this.editingExt = undefined; }
  get filteredExtinguishers() {
    const q = this.searchExt.toLowerCase();
    return this.extinguishers.filter(e =>
      (e.location ?? '').toLowerCase().includes(q) ||
      (e.serialNumber ?? '').toLowerCase().includes(q)
    );
  }

  // Certifications
  openCertForm(cert?: Certification) { this.editingCert = cert; this.showCertModal = true; }
  closeCertForm() { this.showCertModal = false; this.editingCert = undefined; }
  onCertSaved() { this.reloadAll(); this.closeCertForm(); }
  openDeleteCert(cert: Certification) { this.editingCert = cert; this.showDeleteCertModal = true; }
  confirmDeleteCert() {
    if (this.editingCert) {
      this.certificationApi.delete(this.editingCert.id!).subscribe(() => this.reloadAll());
    }
    this.showDeleteCertModal = false; this.editingCert = undefined;
  }
  cancelDeleteCert() { this.showDeleteCertModal = false; this.editingCert = undefined; }
  get filteredCertifications() {
    const q = this.searchCert.toLowerCase();
    return this.certifications.filter(c =>
      (c.name ?? '').toLowerCase().includes(q)
    );
  }

  // Caméras
  openCameraForm(cam?: Camera) { this.editingCam = cam; this.showCamModal = true; }
  closeCameraForm() { this.showCamModal = false; this.editingCam = undefined; }
  onCameraSaved() { this.reloadAll(); this.closeCameraForm(); }
  openDeleteCam(cam: Camera) { this.editingCam = cam; this.showDeleteCamModal = true; }
  confirmDeleteCam() {
    if (this.editingCam) {
      this.cameraApi.delete(this.editingCam.id!).subscribe(() => this.reloadAll());
    }
    this.showDeleteCamModal = false; this.editingCam = undefined;
  }
  cancelDeleteCam() { this.showDeleteCamModal = false; this.editingCam = undefined; }
  get filteredCameras() {
    const q = this.searchCam.toLowerCase();
    return this.cameras.filter(c =>
      (c.label ?? '').toLowerCase().includes(q) ||
      (c.location ?? '').toLowerCase().includes(q)
    );
  }

  // Trousses de secours
  openKitForm(kit?: FirstAidKit) { this.editingKit = kit; this.showKitModal = true; }
  closeKitForm() { this.showKitModal = false; this.editingKit = undefined; }
  onKitSaved() { this.reloadAll(); this.closeKitForm(); }
  openDeleteKit(kit: FirstAidKit) { this.editingKit = kit; this.showDeleteKitModal = true; }
  confirmDeleteKit() {
    if (this.editingKit) {
      this.kitApi.delete(this.editingKit.id!).subscribe(() => this.reloadAll());
    }
    this.showDeleteKitModal = false; this.editingKit = undefined;
  }
  cancelDeleteKit() { this.showDeleteKitModal = false; this.editingKit = undefined; }
  get filteredKits() {
    const q = this.searchKit.toLowerCase();
    return this.kits.filter(k =>
      (k.site ?? '').toLowerCase().includes(q)
    );
  }

  // Assurances
  openInsuranceForm(ins?: Insurance) { this.editingIns = ins; this.showInsModal = true; }
  closeInsuranceForm() { this.showInsModal = false; this.editingIns = undefined; }
  onInsuranceSaved() { this.reloadAll(); this.closeInsuranceForm(); }
  openDeleteIns(ins: Insurance) { this.editingIns = ins; this.showDeleteInsModal = true; }
  confirmDeleteIns() {
    if (this.editingIns) {
      this.insuranceApi.delete(this.editingIns.id!).subscribe(() => this.reloadAll());
    }
    this.showDeleteInsModal = false; this.editingIns = undefined;
  }
  cancelDeleteIns() { this.showDeleteInsModal = false; this.editingIns = undefined; }
  get filteredInsurances() {
    const q = this.searchIns.toLowerCase();
    return this.insurances.filter(i =>
      (i.type ?? '').toLowerCase().includes(q) ||
      (i.provider ?? '').toLowerCase().includes(q)
    );
  }
}
