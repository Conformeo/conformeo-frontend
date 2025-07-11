import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpoEditDialogComponent } from './dpo-edit-dialog.component';

describe('DpoEditDialogComponent', () => {
  let component: DpoEditDialogComponent;
  let fixture: ComponentFixture<DpoEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpoEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpoEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
