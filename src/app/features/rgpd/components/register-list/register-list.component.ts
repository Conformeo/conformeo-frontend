import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterService } from '../../register.service';
import { Register } from '../../../../models/register';

@Component({
  selector: 'app-register-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.scss']
})
export class RegisterListComponent implements OnInit {
  @Input() userId!: number;
  registers: Register[] = [];
  loading = true;
  showForm = false;
  registerForm: Partial<Register> = { nom_traitement: '' };
  editId: number | null = null;

  constructor(private registerService: RegisterService) {}

  ngOnInit() {
    this.loadRegisters();
  }

  loadRegisters() {
    this.loading = true;
    this.registerService.list(this.userId).subscribe({
      next: regs => { this.registers = regs; this.loading = false; },
      error: () => { this.registers = []; this.loading = false; }
    });
  }

  addRegister() {
    if (!this.registerForm.nom_traitement) return;
    this.registerService.create({ ...this.registerForm, user_id: this.userId } as Register).subscribe(reg => {
      this.registers.push(reg);
      this.showForm = false;
      this.registerForm = { nom_traitement: '' };
    });
  }

  editRegister(reg: Register) {
    this.showForm = true;
    this.editId = reg.id!;
    this.registerForm = { ...reg };
  }

  saveEdit() {
    if (!this.editId) return;
    this.registerService.update(this.editId, this.registerForm).subscribe(reg => {
      const idx = this.registers.findIndex(r => r.id === this.editId);
      if (idx !== -1) this.registers[idx] = reg;
      this.showForm = false;
      this.editId = null;
      this.registerForm = { nom_traitement: '' };
    });
  }

  deleteRegister(reg: Register) {
    if (confirm('Supprimer ce traitement ?')) {
      this.registerService.delete(reg.id!).subscribe(() => {
        this.registers = this.registers.filter(r => r.id !== reg.id);
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.editId = null;
    this.registerForm = { nom_traitement: '' };
  }
}
