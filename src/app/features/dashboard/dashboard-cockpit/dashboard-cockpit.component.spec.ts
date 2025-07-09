import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCockpitComponent } from './dashboard-cockpit.component';

describe('DashboardCockpitComponent', () => {
  let component: DashboardCockpitComponent;
  let fixture: ComponentFixture<DashboardCockpitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCockpitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
