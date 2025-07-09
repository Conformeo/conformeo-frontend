import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSecuriteComponent } from './dashboard-securite.component';

describe('DashboardSecuriteComponent', () => {
  let component: DashboardSecuriteComponent;
  let fixture: ComponentFixture<DashboardSecuriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSecuriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSecuriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
