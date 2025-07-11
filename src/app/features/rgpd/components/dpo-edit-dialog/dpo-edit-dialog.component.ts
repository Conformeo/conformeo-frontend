import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dpo-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './dpo-edit-dialog.component.html',
  styleUrls: ['./dpo-edit-dialog.component.scss'],
})
export class DpoEditDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DpoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nom: [data?.nom || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      telephone: [data?.telephone || ''],
      designation_date: [data?.designation_date || '', Validators.required],
      is_external: [data?.is_external || false],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
