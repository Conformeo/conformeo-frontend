import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreEditDialogComponent } from './registre-edit-dialog.component';

describe('RegistreEditDialogComponent', () => {
  let component: RegistreEditDialogComponent;
  let fixture: ComponentFixture<RegistreEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistreEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistreEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
