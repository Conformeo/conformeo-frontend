import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOuvriersComponent } from './dashboard-ouvriers.component';

describe('DashboardOuvriersComponent', () => {
  let component: DashboardOuvriersComponent;
  let fixture: ComponentFixture<DashboardOuvriersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOuvriersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOuvriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
