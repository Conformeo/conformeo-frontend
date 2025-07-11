import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rgpd-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rgpd-page.component.html',
  styleUrls: ['./rgpd-page.component.scss']
})
export class RgpdPageComponent {}
