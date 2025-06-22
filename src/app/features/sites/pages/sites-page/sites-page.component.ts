import { Component, OnInit }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { Observable }             from 'rxjs';
import { SitesService }           from '../../services/sites.service';
import { Site }                   from '../../../../models/site.model';
import { SiteFormComponent }      from '../../components/site-form/site-form.component';
import { SiteTableComponent }     from '../../components/site-table/site-table.component';
import { SkeletonComponent }      from '../../../../shared/skeleton/skeleton/skeleton.component';

@Component({
  selector: 'app-sites-page',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonComponent,
    SiteFormComponent,
    SiteTableComponent,
  ],
  templateUrl: './sites-page.component.html'
})
export class SitesPageComponent implements OnInit {
  sites$!: Observable<Site[]>;
  editingSite: Site | undefined = undefined;
  search = '';

  constructor(private service: SitesService) {}

  ngOnInit() {
    this.sites$ = this.service.getAll();
  }

  openForm(site?: Site) { this.editingSite = site; }
  closeForm()           { this.editingSite = undefined; }

  onSiteSaved(site: Site) {
    // Ajoute ici la logique pour créer/mettre à jour via le service si besoin, puis recharge.
    this.closeForm();
    this.sites$ = this.service.getAll();
  }
}
