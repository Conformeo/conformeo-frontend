import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExigenceDetailDialogComponent } from './exigence-detail-dialog.component';

describe('ExigenceDetailDialogComponent', () => {
  let component: ExigenceDetailDialogComponent;
  let fixture: ComponentFixture<ExigenceDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExigenceDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExigenceDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
