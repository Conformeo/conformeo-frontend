// src/app/features/checklists/checklist-list/checklist-list.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule }    from '@angular/common/http/testing';
import { ChecklistListComponent }     from './checklist-list.component';

describe('ChecklistListComponent', () => {
  let component: ChecklistListComponent;
  let fixture: ComponentFixture<ChecklistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,  // fournit HttpClient à ChecklistService
        ChecklistListComponent    // composant standalone
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
