import { CommonModule } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';
import { Site } from '../../../../models/site.model';
import { SitesService } from '../../services/sites.service';
import { SiteFormComponent } from '../../components/site-form/site-form.component';
import { SiteTableComponent } from '../../components/site-table/site-table.component';
import { ModalComponent } from '../../../../shared/modal/modal.component';

@Component({
  selector: 'app-sites-page',
  standalone: true,
  imports: [CommonModule, ModalComponent, SiteFormComponent, SiteTableComponent],
  templateUrl: './sites-page.component.html'
})
export class SitesPageComponent implements OnInit {
  sites: Site[] = [];
  editingSite: Site | null = null;
  siteToDelete: Site | null = null;

  constructor(private service: SitesService) {}

  ngOnInit() { this.reload(); }
  reload() {
    this.service.getAll().subscribe(list => this.sites = list ?? []);
  }

  openForm(site?: Site) {
    this.editingSite = site ? { ...site } : { id: '', name: '', address: '', city: '', zipCode: '', score: 0 };
  }

  closeForm() {
    this.editingSite = null;
  }

  onSiteSaved(site: Site) {
    const obs = site.id
      ? this.service.update(site)
      : this.service.add({ ...site, id: Date.now().toString() });
    obs.subscribe(() => { this.reload(); this.closeForm(); });
  }

  openDeleteSite(site: Site) { this.siteToDelete = site; }
  cancelDeleteSite() { this.siteToDelete = null; }
  confirmDeleteSite() {
    if (!this.siteToDelete) return;
    this.service.delete(this.siteToDelete.id).subscribe(() => {
      this.reload();
      this.cancelDeleteSite();
    });
  }
}
