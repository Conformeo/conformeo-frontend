import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCertifComponent } from './dashboard-certif.component';

describe('DashboardCertifComponent', () => {
  let component: DashboardCertifComponent;
  let fixture: ComponentFixture<DashboardCertifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCertifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCertifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
