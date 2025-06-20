import { Component } from '@angular/core';
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
    pageTitle = 'Conformeo';

}
