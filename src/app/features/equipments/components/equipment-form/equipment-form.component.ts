import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Equipment } from '../../../../models/equipment.model';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EquipmentFormComponent implements OnInit {
  @Input() equipment: Equipment = { id: '', name: '', type: '' };
  @Output() save = new EventEmitter<Equipment>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit() {
    this.equipment = { ...this.equipment };
  }
  onSubmit() {
    this.save.emit(this.equipment);
  }
}
