import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Camera } from '../../../../models/camera.model';
import { CameraApi } from '../../../../core/api/camera.api';

@Component({
  selector: 'app-camera-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    nextCheck: FormControl<string>;
    status: FormControl<'OK' | 'KO'>;
    zoneCovered: FormControl<string>;
    photoUrl: FormControl<string>;
  }>;

  constructor(
    private fb: NonNullableFormBuilder,
    private api: CameraApi,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      label:        this.fb.control('', Validators.required),
      location:     this.fb.control('', Validators.required),
      lastCheck:    this.fb.control('', Validators.required),
      nextCheck:    this.fb.control('', Validators.required),
      status:       this.fb.control<'OK'|'KO'>('OK', Validators.required),
      zoneCovered:  this.fb.control(''),
      photoUrl:     this.fb.control(''),
    });
  }

  ngOnInit() {
    if (this.camera) this.form.patchValue(this.camera as any);
  }

  cancel() { this.saved.emit(); }

  submit() {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const cam: Camera = {
      id: this.camera?.id ?? Math.random().toString(36).slice(2,9),
      ...value
    };
    const req$ = this.camera
      ? this.api.update(cam.id, cam)
      : this.api.create(cam);
    req$.subscribe({
      next: () => {
        this.snack.open('Caméra enregistrée ✅', '', { duration: 2000 });
        this.saved.emit();
      },
      error: err => this.snack.open(err?.message || 'Erreur serveur', '', { duration: 3000 }),
    });
  }
}
