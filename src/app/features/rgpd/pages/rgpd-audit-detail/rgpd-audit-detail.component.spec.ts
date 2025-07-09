import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdAuditDetailComponent } from './rgpd-audit-detail.component';

describe('RgpdAuditDetailComponent', () => {
  let component: RgpdAuditDetailComponent;
  let fixture: ComponentFixture<RgpdAuditDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgpdAuditDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdAuditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
