import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Checklist, ChecklistItem } from '../../../../core/models/checklist.model';
import { ChecklistService } from '../../../../core/services/checklist.service';

@Component({
  selector: 'app-checklist-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checklist-detail.component.html',
  styleUrls: ['./checklist-detail.component.scss']
})
export class ChecklistDetailComponent implements OnInit {
  /** Identifiant de la checklist */
  cid!: number;

  /** Données de la checklist */
  checklist?: Checklist;

  /** Liste des items de la checklist */
  items: ChecklistItem[] = [];

  /** Nouveau label d'item */
  label = '';

  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(ChecklistService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cid = Number(params.get('id'));
      // Récupère la checklist avec ses items
      this.service.getById(this.cid).subscribe(cl => {
        this.checklist = cl;
        this.items = cl.items || [];
      });
    });
  }

  toggle(item: ChecklistItem): void {
    item.is_done = !item.is_done;
    this.service.updateItem(this.cid, item.id, { is_done: item.is_done }).subscribe();
  }

  delete(item: ChecklistItem): void {
    this.service.deleteItem(this.cid, item.id).subscribe(() => {
      this.items = this.items.filter(i => i.id !== item.id);
    });
  }

  addItem(): void {
    if (!this.label.trim()) return;
    this.service.addItem(this.cid, { label: this.label }).subscribe(newItem => {
      this.items.push(newItem);
      this.label = '';
    });
  }
}