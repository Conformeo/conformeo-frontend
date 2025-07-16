import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; // AJOUTÉ
import { RegistreEditDialogComponent } from '../registre-edit-dialog/registre-edit-dialog.component';
import { RegistreService } from '../../registre.service';
import { Registre } from '../../../../models/registre';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registre-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatIconModule, // AJOUTÉ
  ],
  templateUrl: './registre-list.component.html',
  styleUrls: ['./registre-list.component.scss']
})
export class RegistreListComponent implements OnInit {
  @Input() userId!: number;
  registers: Registre[] = [];
  loading = true;
  showForm = false;

  registerForm: Partial<Registre> = this.defaultRegisterForm();

  constructor(
    private registreService: RegistreService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadRegisters();
  }

  defaultRegisterForm(): Partial<Registre> {
    return {
      nom_traitement: '',
      finalite: '',
      base_legale: '',
      personnes_concernees: '',
      duree_conservation: ''
    };
  }

  loadRegisters() {
    this.loading = true;
    this.registreService.list().subscribe({
      next: regs => { this.registers = regs; this.loading = false; },
      error: () => { this.registers = []; this.loading = false; }
    });
  }

  addRegister() {
    if (!this.registerForm.nom_traitement) return;
    const regToSend = { ...this.registerForm, user_id: this.userId } as Registre;
    this.registreService.create(regToSend).subscribe(reg => {
      this.registers.push(reg);
      this.showForm = false;
      this.registerForm = this.defaultRegisterForm();
    });
  }

  editRegister(reg: Registre) {
    const dialogRef = this.dialog.open(RegistreEditDialogComponent, {
      width: '600px',
      data: { register: reg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registreService.update(reg.id!, result).subscribe(updatedReg => {
          const idx = this.registers.findIndex(r => r.id === reg.id);
          if (idx !== -1) this.registers[idx] = updatedReg;
        });
      }
    });
  }

  deleteRegister(reg: Registre) {
    if (confirm('Supprimer ce traitement ?')) {
      this.registreService.delete(reg.id!).subscribe(() => {
        this.registers = this.registers.filter(r => r.id !== reg.id);
      });
    }
  }

  cancel() {
    this.showForm = false;
    this.registerForm = this.defaultRegisterForm();
  }

  exportPdf() {
    const data = document.getElementById('registre-table');
    if (!data) return;
    // Ajoute un fond blanc temporaire
    const prevBg = data.style.backgroundColor;
    data.style.backgroundColor = '#fff';
    html2canvas(data, { backgroundColor: '#fff' }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('registre-rgpd.pdf');
      data.style.backgroundColor = prevBg; // Restore
    });
  }
}
