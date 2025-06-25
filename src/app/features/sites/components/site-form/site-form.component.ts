import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Site } from '../../../../models/site.model';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-site-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './site-form.component.html'
})
export class SiteFormComponent {
  @Input()  site: Site = { id: '', name: '', address: '', city: '', zipCode: '', score: 0 };
  @Output() save = new EventEmitter<Site>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    if (this.site.name && this.site.address && this.site.city && this.site.zipCode) {
      this.save.emit({ ...this.site });
    }
  }
}
