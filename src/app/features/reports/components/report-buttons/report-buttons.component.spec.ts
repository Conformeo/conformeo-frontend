import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportButtonsComponent } from './report-buttons.component';

describe('ReportButtonsComponent', () => {
  let component: ReportButtonsComponent;
  let fixture: ComponentFixture<ReportButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
