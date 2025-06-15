// src/app/features/checklists/checklist-list/checklist-list.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Checklist } from '../../../core/models/checklist.model';
import { ChecklistService } from '../../../core/services/checklist.service';

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.scss']
})
export class ChecklistListComponent implements OnInit {
  checklists: Checklist[] = [];
  private readonly service = inject(ChecklistService);

  ngOnInit(): void {
    this.service.list().subscribe(data => this.checklists = data);
  }
}
