import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { TitleService }  from '../../services/title.service';
import { LoaderService } from '../../services/loader.service';
import { Observable }    from 'rxjs';
import { GlobalLoaderComponent } from '../../../shared/loader/global-loader.component';
import { IconsModule } from '../../../icons/icons.module';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
  CommonModule,
  RouterModule,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  IconsModule,             // ⬅️ remplace LucideAngularModule par IconsModule
  GlobalLoaderComponent,
],

  templateUrl: './app-shell.component.html',
  styleUrl:   './app-shell.component.scss',
})
export class AppShellComponent {
  /** Flux pour le titre de page et l’état de chargement global */
  title$!:   Observable<string>;
  loading$!: Observable<boolean>;

  constructor(
    private titleSvc: TitleService,
    private loader:   LoaderService,
  ) {
    this.title$   = this.titleSvc.title$;
    this.loading$ = this.loader.loading$;
  }
}
