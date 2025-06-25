import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFormComponent } from '../../components/equipment-form/equipment-form.component';
import { EquipmentTableComponent } from '../../components/equipment-table/equipment-table.component';
import { EquipmentService } from '../../../../core/services/equipment.service';
import { Equipment } from '../../../../models/equipment.model';
import { ModalComponent } from '../../../../shared/modal/modal.component'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-equipments-page',
  templateUrl: './equipments-page.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    EquipmentFormComponent, 
    EquipmentTableComponent,
    ModalComponent
  ],
})
export class EquipmentsPageComponent implements OnInit {
  equipments: Equipment[] = [];
  editingEquipment?: Equipment;
  searchEquip = '';

  get filteredEquipments() {
    const q = this.searchEquip?.toLowerCase() ?? '';
    return this.equipments.filter(eq =>
      (eq.name ?? '').toLowerCase().includes(q) ||
      (eq.type ?? '').toLowerCase().includes(q) ||
      (eq.serial ?? '').toLowerCase().includes(q)
    );
  }


  constructor(private service: EquipmentService) {}

  ngOnInit() {
    this.reload();
  }
  reload() {
    this.service.getAll().subscribe(list => this.equipments = list ?? []);
  }
  openForm(equipment?: Equipment) {
    this.editingEquipment = equipment ? { ...equipment } : { id: '', name: '', type: '' };
  }
  closeForm() { this.editingEquipment = undefined; }
  onEquipmentSaved(equipment: Equipment) {
    if (equipment.id) {
      this.service.update(equipment).subscribe(() => {
        this.reload();
        this.closeForm();
      });
    } else {
      equipment.id = Date.now().toString();
      this.service.add(equipment).subscribe(() => {
        this.reload();
        this.closeForm();
      });
    }
  }
  onEquipmentDeleted(id: string) {
    this.service.delete(id).subscribe(() => this.reload());
  }
}
