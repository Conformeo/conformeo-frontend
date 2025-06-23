import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Site } from '../../../../models/site.model';

@Component({
  selector: 'app-site-form',
  standalone: true,
  templateUrl: './site-form.component.html',
  imports: [CommonModule, FormsModule],
})
export class SiteFormComponent implements OnInit {
  @Input() site: Site = { id: '', name: '', address: '', city: '', zipCode: '', score: 0 };
  @Output() save = new EventEmitter<Site>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit() {
    // Pour l’édition, il faut cloner l’objet pour éviter de modifier la liste en live
    this.site = { ...this.site };
  }

  onSubmit() {
    this.save.emit(this.site);
  }
}
