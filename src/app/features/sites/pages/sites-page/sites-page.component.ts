import { Component, OnInit }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { Observable }             from 'rxjs';
import { SitesService }           from '../../services/sites.service';
import { Site }                   from '../../../../models/site.model';
import { SiteFormComponent }      from '../../components/site-form/site-form.component';
import { SiteTableComponent }     from '../../components/site-table/site-table.component';

@Component({
  selector: 'app-sites-page',
  standalone: true,
  imports: [
  CommonModule,
  SiteFormComponent,
  SiteTableComponent,
  ],
  templateUrl: './sites-page.component.html'
})
export class SitesPageComponent implements OnInit {
  sites$!: Observable<Site[]>;
  editingSite: Site | undefined = undefined;
  search = '';
  sites: Site[] = [];


  constructor(private service: SitesService) {}

  ngOnInit() {
    this.service.getAll().subscribe(sites => {
      this.sites = sites ?? [];
    });
  }


  openForm(site?: Site) { this.editingSite = site; }
  closeForm()           { this.editingSite = undefined; }

  onSiteSaved(site: Site) {
  if (site.id) {
    this.service.update(site).subscribe(() => {
      this.sites$ = this.service.getAll();
      this.closeForm();
    });
  } else {
    // Génère un nouvel ID ici si besoin (ex: Date.now().toString() ou uuid)
    site.id = Date.now().toString();
    this.service.add(site).subscribe(() => {
      this.sites$ = this.service.getAll();
      this.closeForm();
    });
  }
}

onSiteDeleted(id: string) {
  this.service.delete(id).subscribe(() => {
    this.sites$ = this.service.getAll();
  });
}

}
