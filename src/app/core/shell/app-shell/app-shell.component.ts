import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';   // chemin à ajuster
import { Observable } from 'rxjs';
import {
  RouterModule,
  RouterLinkActive,
  RouterOutlet,
  RouterLink,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconsModule }  from '../../../icons/icons.module';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    IconsModule,
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  title$: Observable<string>;

  constructor(private titleSvc: TitleService) {
    this.title$ = this.titleSvc.title$;
  }

}
