import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap, map } from 'rxjs';

import { SitesService } from '../../services/sites.service';
import { Site } from '../../../../models/site.model';

@Component({
  selector: 'app-site-detail-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="site$ | async as site; else loading">
      <h1 class="text-2xl font-semibold mb-4">{{ site.name }}</h1>
      <div class="mb-2 text-sm text-slate-600">
        <span class="font-semibold">Adresse :</span> {{ site.address }}, {{ site.zipCode }} {{ site.city }}
      </div>
      <div class="mb-4">
        <span class="font-semibold">Score conformité :</span> <span class="badge">{{ site.score ?? '—' }}</span>
      </div>
      <!-- 🔽 Ajoute ici les futurs composants “sécurité”, “extincteurs”, etc. par chantier -->
    </ng-container>
    <ng-template #loading>
      <div class="text-slate-400">Chargement du chantier...</div>
    </ng-template>
  `,
})
export class SiteDetailPageComponent implements OnInit {
  site$!: Observable<Site | undefined>;

  constructor(
    private route: ActivatedRoute,
    private service: SitesService
  ) {}

  ngOnInit() {
    this.site$ = this.route.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => this.service.getById(id))
    );
  }
}
