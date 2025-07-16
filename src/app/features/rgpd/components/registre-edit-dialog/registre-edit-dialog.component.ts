import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Registre } from '../../../../models/registre';

@Component({
  selector: 'app-registre-edit-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './registre-edit-dialog.component.html',
  styleUrls: ['./registre-edit-dialog.component.scss']
})
export class RegistreEditDialogComponent {
  registerForm: Partial<Registre>;

  constructor(
    public dialogRef: MatDialogRef<RegistreEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { register: Registre }
  ) {
    // Clone le registre reçu (pour éditer sans toucher l’original)
    this.registerForm = { ...data.register };
  }

  save() {
    this.dialogRef.close(this.registerForm);
  }

  cancel() {
    this.dialogRef.close();
  }
}
