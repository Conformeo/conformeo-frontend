import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRgpdComponent } from './dashboard-rgpd.component';

describe('DashboardRgpdComponent', () => {
  let component: DashboardRgpdComponent;
  let fixture: ComponentFixture<DashboardRgpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRgpdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRgpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
