import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule       // ← rend disponible <lucide-icon>
  ],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent {
  /** ouverture/fermeture du burger en mode mobile */
  menuOpen = false;

  /** liens du side-nav (icône = nom Lucide déjà « pické » dans IconsModule) */
  links = [
    { path: '/dashboard', label: 'Dashboard',  icon: 'layout-dashboard' },
    { path: '/company',   label: 'Company',    icon: 'briefcase-business' },
    { path: '/sites',     label: 'Sites',      icon: 'map-pin' },
    { path: '/inspections', label: 'Inspections', icon: 'clipboard-check' },
    // …
  ];
}
