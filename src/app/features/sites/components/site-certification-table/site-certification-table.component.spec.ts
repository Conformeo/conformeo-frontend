import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCertificationTableComponent } from './site-certification-table.component';

describe('SiteCertificationTableComponent', () => {
  let component: SiteCertificationTableComponent;
  let fixture: ComponentFixture<SiteCertificationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteCertificationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteCertificationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
