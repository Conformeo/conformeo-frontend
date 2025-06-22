import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Site } from '../../../../models/site.model';

@Component({
  selector: 'app-site-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './site-form.component.html',
})
export class SiteFormComponent implements OnChanges {
  @Input() site?: Site;
  @Output() saved = new EventEmitter<Site>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      score: [null]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['site'] && this.site) {
      this.form.patchValue(this.site);
    } else if (changes['site'] && !this.site) {
      this.form.reset();
    }
  }

  submit() {
    if (this.form.valid) {
      // On propage l’id s’il existe, sinon le back l’ajoutera
      this.saved.emit({ ...this.site, ...this.form.getRawValue() });
    }
  }
}
