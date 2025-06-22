import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInsuranceTableComponent } from './site-insurance-table.component';

describe('SiteInsuranceTableComponent', () => {
  let component: SiteInsuranceTableComponent;
  let fixture: ComponentFixture<SiteInsuranceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteInsuranceTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteInsuranceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
