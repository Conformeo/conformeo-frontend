import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { Observable }        from 'rxjs';

import { CompanyService }      from '../../company.service';
import { FireExtinguisher }    from '../../../../models/fire-extinguisher.model';
import { Certification }       from '../../../../models/certification.model';
import { Camera }              from '../../../../models/camera.model';
import { FirstAidKit }         from '../../../../models/first-aid-kit.model';
import { Insurance }           from '../../../../models/insurance.model';

/* Composants */
import { ExtinguisherTableComponent }   from '../../components/extinguisher-table/extinguisher-table.component';
import { ExtinguisherFormComponent }    from '../../components/extinguisher-form/extinguisher-form.component';
import { CertificationTableComponent }  from '../../components/certification-table/certification-table.component';
import { CertificationFormComponent }   from '../../components/certification-form/certification-form.component';
import { CameraTableComponent }         from '../../components/camera-table/camera-table.component';
import { CameraFormComponent }         from '../../components/camera-form/camera-form.component';
import { KitTableComponent }            from '../../components/kit-table/kit-table.component';
import { KitFormComponent }            from '../../components/kit-form/kit-form.component';
import { InsuranceTableComponent }      from '../../components/insurance-table/insurance-table.component';
import { InsuranceFormComponent }      from '../../components/insurance-form/insurance-form.component';
import { ModalComponent }               from '../../../../shared/modal/modal.component';
import { SkeletonComponent }            from '../../../../shared/skeleton/skeleton/skeleton.component';

@Component({
  selector   : 'app-company-page',
  standalone : true,
  imports    : [
    CommonModule,
    SkeletonComponent,
    ExtinguisherTableComponent,
    CertificationTableComponent,
    CameraTableComponent,
    KitTableComponent,
    InsuranceTableComponent,
    ExtinguisherFormComponent,
    CertificationFormComponent,
    CameraFormComponent,
    KitFormComponent,
    InsuranceFormComponent,
    ModalComponent,
  ],
  templateUrl: './company-page.component.html',
})
export class CompanyPageComponent implements OnInit {

  exts$!:         Observable<FireExtinguisher[]>;
  certs$!:        Observable<Certification[]>;
  cameras$!:      Observable<Camera[]>;
  kits$!:         Observable<FirstAidKit[]>;
  insurances$!:   Observable<Insurance[]>;

  /** États modaux */
  editingExt : FireExtinguisher | null = null;
  editingCert: Certification    | null = null;
  editingCam : Camera           | null = null;
  editingKit : FirstAidKit      | null = null;
  editingIns : Insurance        | null = null;

  constructor(private service: CompanyService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll() {
    this.exts$       = this.service.getExtinguishers();
    this.certs$      = this.service.getCertifications();
    this.cameras$    = this.service.getCameras();
    this.kits$       = this.service.getKits();
    this.insurances$ = this.service.getInsurances();
  }

  /* --------- ouverture/fermeture des modales --------- */
  openExtForm(ext?: FireExtinguisher)    { this.editingExt  = ext ?? ({} as FireExtinguisher); }
  closeExtForm()                         { this.editingExt  = null; }

  openCertForm(cert?: Certification)     { this.editingCert = cert ?? ({} as Certification);  }
  closeCertForm()                        { this.editingCert = null; }

  openCameraForm(cam?: Camera)           { this.editingCam  = cam  ?? ({} as Camera); }
  closeCameraForm()                      { this.editingCam  = null; }

  openKitForm(kit?: FirstAidKit)         { this.editingKit  = kit  ?? ({} as FirstAidKit); }
  closeKitForm()                         { this.editingKit  = null; }

  openInsuranceForm(ins?: Insurance)     { this.editingIns  = ins  ?? ({} as Insurance); }
  closeInsuranceForm()                   { this.editingIns  = null; }

  /* --------- rechargement après sauvegarde --------- */
  onSaved() {
    this.loadAll();
  }
}