import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdExigenceAdminComponent } from './rgpd-exigence-admin.component';

describe('RgpdExigenceAdminComponent', () => {
  let component: RgpdExigenceAdminComponent;
  let fixture: ComponentFixture<RgpdExigenceAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgpdExigenceAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdExigenceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
