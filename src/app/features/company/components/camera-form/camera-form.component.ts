// src/app/features/company/components/camera-form/camera-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconsModule } from '../../../../icons/icons.module';
import { Camera } from '../../../../models/camera.model';
import { CameraApi } from '../../../../core/api/camera.api';

type EditableKey = Extract<keyof Camera, 'label' | 'location' | 'lastCheck' | 'zoneCovered' | 'photoUrl'>;
type CameraDto = Pick<Camera, EditableKey>;

@Component({  
  selector: 'app-camera-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconsModule],
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.scss'],
})
export class CameraFormComponent implements OnInit {
  @Input() camera?: Camera;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup<{
    label: FormControl<string>;
    location: FormControl<string>;
    lastCheck: FormControl<string>;
    zoneCovered: FormControl<string>;
    photoUrl: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private api: CameraApi,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      label: ['', Validators.required],
      location: ['', Validators.required],
      lastCheck: ['', Validators.required],
      zoneCovered: ['', Validators.required],
      photoUrl: [''],
    });
  }

  ngOnInit() {
    if (this.camera) {
      this.form.patchValue(this.camera as any);
    }
  }

  cancel() {
    this.saved.emit();
  }

  submit() {
    if (this.form.invalid) return;
    const dto: CameraDto = this.form.getRawValue();
    const obs = this.camera
      ? this.api.update(this.camera.id!, dto)
      : this.api.create(dto);
    obs.subscribe({
      next: () => {
        this.snack.open('Caméra enregistrée ✅', 'Fermer', { duration: 3000 });
        this.saved.emit();
      },
      error: (err: any) => {
        this.snack.open(
          err?.message || 'Erreur serveur',
          'Fermer',
          { duration: 4000, panelClass: ['bg-rose-600', 'text-white'] }
        );
      }
    });
  }
}
