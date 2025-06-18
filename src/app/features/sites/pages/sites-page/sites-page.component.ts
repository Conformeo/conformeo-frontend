// src/app/features/sites/pages/sites-page/sites-page.component.ts
import { Component, OnInit }     from '@angular/core';
import { Observable }             from 'rxjs';
import { Site }                   from '../../../../models/site.model';
import { SitesService }           from '../../sites.service';

@Component({
  selector: 'app-sites-page',
  templateUrl: './sites-page.component.html',
  styleUrls: ['./sites-page.component.scss']
})
export class SitesPageComponent implements OnInit {
  sites$!: Observable<Site[]>;

  constructor(private sitesService: SitesService) {}

  ngOnInit() {
    this.sites$ = this.sitesService.getAll();
  }
}
