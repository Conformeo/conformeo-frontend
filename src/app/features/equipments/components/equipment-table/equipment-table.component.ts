import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Equipment } from '../../../../models/equipment.model';

@Component({
  selector: 'app-equipment-table',
  templateUrl: './equipment-table.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class EquipmentTableComponent {
  @Input() equipments: Equipment[] = [];
  @Output() edit = new EventEmitter<Equipment>();
  @Output() delete = new EventEmitter<string>();
}
