import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Site } from '../../../../models/site.model'
import { CompanyService } from '../../../company/company.service'
import { SiteTableComponent } from '../../../sites/components/site-table/site-table.component';
import { SiteFormComponent } from '../../../sites/components/site-form/site-form.component';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton/skeleton.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [
    CommonModule,
    SiteTableComponent,
    SiteFormComponent,
    ModalComponent,
    SkeletonComponent,
  ],
  templateUrl: './project-page.component.html',
})
export class ProjectPageComponent implements OnInit {
  sites$!: Observable<Site[]>;
  editingSite: Site | null = null;

  constructor(private service: CompanyService /* or SiteService */) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.sites$ = this.service.getSites();
  }

  openForm(site?: Site) {
    this.editingSite = site ?? ({} as Site);
  }

  closeForm() {
    this.editingSite = null;
  }

  onSaved() {
    this.closeForm();
    this.load();
  }
}