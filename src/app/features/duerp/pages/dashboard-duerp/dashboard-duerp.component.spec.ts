import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDuerpComponent } from './dashboard-duerp.component';

describe('DashboardDuerpComponent', () => {
  let component: DashboardDuerpComponent;
  let fixture: ComponentFixture<DashboardDuerpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDuerpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDuerpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
