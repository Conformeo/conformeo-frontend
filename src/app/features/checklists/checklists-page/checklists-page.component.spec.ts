import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistsPageComponent } from './checklists-page.component';

describe('ChecklistsPageComponent', () => {
  let component: ChecklistsPageComponent;
  let fixture: ComponentFixture<ChecklistsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecklistsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
