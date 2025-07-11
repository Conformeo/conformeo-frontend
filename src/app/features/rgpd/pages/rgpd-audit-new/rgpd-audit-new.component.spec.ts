import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgpdAuditNewComponent } from './rgpd-audit-new.component';

describe('RgpdAuditNewComponent', () => {
  let component: RgpdAuditNewComponent;
  let fixture: ComponentFixture<RgpdAuditNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RgpdAuditNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgpdAuditNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
