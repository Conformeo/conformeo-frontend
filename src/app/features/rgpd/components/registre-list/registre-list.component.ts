import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RegistreEditDialogComponent } from '../registre-edit-dialog/registre-edit-dialog.component';
import { RgpdService } from '../../rgpd.service';
import { Registre } from '../../../../models/registre';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-registre-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './registre-list.component.html',
  styleUrls: ['./registre-list.component.scss'],
})
export class RegistreListComponent implements OnInit {
  registers: Registre[] = [];
  loading = true;
  showForm = false;

  registerForm: Partial<Registre> = this.defaultRegisterForm();

  constructor(private rgpdService: RgpdService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadRegisters();
  }

  defaultRegisterForm(): Partial<Registre> {
    return {
      nom_traitement: '',
      finalite: '',
      base_legale: '',
      personnes_concernees: '',
      duree_conservation: '',
    };
  }

  loadRegisters() {
    this.loading = true;
    this.rgpdService.getRegistreList().subscribe({
      next: (regs: Registre[]) => {
        this.registers = regs;
        this.loading = false;
      },
      error: () => {
        this.registers = [];
        this.loading = false;
      },
    });
  }

  addRegister() {
    if (!this.registerForm.nom_traitement) return;
    this.rgpdService.addRegistreEntry(this.registerForm).subscribe((reg: Registre) => {
      this.registers.push(reg);
      this.showForm = false;
      this.registerForm = this.defaultRegisterForm();
    });
  }

  editRegister(reg: Registre) {
    const dialogRef = this.dialog.open(RegistreEditDialogComponent, {
      width: '600px',
      data: { register: reg },
    });

    dialogRef.afterClosed().subscribe((result: Partial<Registre>) => {
      if (result) {
        this.rgpdService.updateRegistreEntry(reg.id!, result).subscribe((updated: Registre) => {
          const idx = this.registers.findIndex((r) => r.id === reg.id);
          if (idx !== -1) this.registers[idx] = updated;
        });
      }
    });
  }

  deleteRegister(reg: Registre) {
    if (!confirm('Supprimer ce traitement ?')) return;
    this.rgpdService.deleteRegistreEntry(reg.id!).subscribe(() => {
      this.registers = this.registers.filter((r) => r.id !== reg.id);
    });
  }

  cancel() {
    this.showForm = false;
    this.registerForm = this.defaultRegisterForm();
  }

  exportPdf() {
    const table = document.getElementById('registre-table');
    if (!table) return;

    // Forcer un fond blanc pour que le PDF soit lisible quel que soit le thème
    const prevBg = table.style.backgroundColor;
    table.style.backgroundColor = '#fff';

    html2canvas(table as HTMLElement, { backgroundColor: '#fff' })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (canvas.height * pageWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        pdf.save('registre-rgpd.pdf');
      })
      .catch((err) => console.error(err))
      .finally(() => {
        table.style.backgroundColor = prevBg; // Restaurer le style original
      });
  }
}
