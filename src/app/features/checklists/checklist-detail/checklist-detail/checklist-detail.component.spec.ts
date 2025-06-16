// src/app/features/checklists/checklist-detail/checklist-detail.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule }        from '@angular/router/testing';
import { HttpClientTestingModule }    from '@angular/common/http/testing';
import { ChecklistDetailComponent }   from './checklist-detail.component';

describe('ChecklistDetailComponent', () => {
  let component: ChecklistDetailComponent;
  let fixture: ComponentFixture<ChecklistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,         // mock d’ActivatedRoute
        HttpClientTestingModule,     // mock HttpClient pour ChecklistService
        ChecklistDetailComponent     // composant standalone
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecklistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
